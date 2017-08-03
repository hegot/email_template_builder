import * as React from "react";
import {Editor} from 'react-draft-wysiwyg';
import {CompositeDecorator} from 'draft-js';
import {EditorState, getCurrentContent, convertToRaw} from 'draft-js';
import toHtml from "./utils/toHtml";
import {getEditorState} from "../../../includes/HelperFunctions";
import {extractInlineStyle} from 'draftjs-utils';
import ModalHandler from './event-handler/modals';
import {getDecorators} from './decorators/Mention';
import {Mentions, Toolbar} from "../../../includes/Config";


interface ILpEditorState {
    editorState:any;
}

interface ILpEditorProps {
    rawstate:string;
    onEditorChange:(type:string, editorState:any, html:string, rawstate:string)=>void;
    type:string;
}


class LpEditor extends React.Component<ILpEditorProps, ILpEditorState> {
    modalHandler:any;
    wrapperId:string;
    wrapper:any;

    constructor(props:ILpEditorProps) {
        super(props);
        const {rawstate} = this.props;
        var editorState:any = getEditorState(rawstate);
        let LpEditorState:ILpEditorState = {
            editorState: editorState
        };
        this.state = LpEditorState;
        const wrapperId = Math.floor(Math.random() * 10000);
        this.wrapperId = `rdw-wrappersa-${wrapperId}`;
        this.modalHandler = new ModalHandler();
    }

    onEditorStateChange(editorState) {
        let contentState = editorState.getCurrentContent();
        let raw = convertToRaw(contentState);
        let rawstate = JSON.stringify(raw);
        let html = toHtml(editorState);
        this.setState({
            editorState: editorState
        });
        this.props.onEditorChange(this.props.type, editorState, html, rawstate);
    }

    componentDidMount() {
        this.modalHandler.init(this.wrapperId);
    }

    getEditorState = () => this.state.editorState;

    getSuggestions() {
        return Mentions;
    }

    setWrapperReference = (ref):void => {
        this.wrapper = ref;
    };

    getWrapperRef() {
        if (this.wrapper) {
            return this.wrapper;
        }
    }

    render() {
        var mentionDecorator = getDecorators({
            separator: ' ',
            trigger: '@',
            mentionClassName: 'mention-className',
            dropdownClassName: 'dropdown-className',
            optionClassName: 'option-className',
            getEditorState: this.getEditorState,
            getSuggestions: this.getSuggestions,
            modalHandler: this.modalHandler,
            onChange: this.onEditorStateChange.bind(this),
            getWrapperRef: this.getWrapperRef.bind(this),
        });
        return (
            <div id={this.wrapperId} ref={this.setWrapperReference}>
                <Editor editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                        toolbar={ Toolbar }
                        customDecorators={mentionDecorator}
                />
            </div>
        );
    }
}

export default LpEditor;