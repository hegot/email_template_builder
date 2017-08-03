import React from "react";
import {CompactPicker} from 'react-color';
import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import {generateOptions} from "../../../includes/HelperFunctions";
import LpEditor from "../../ReusableComponents/LpEditor";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";
import {
    IEditorTab,
    ISelectOption,
    IEditableTextblockProps
} from "../../../includes/Interfaces";

class EditableTextblockEdit extends React.Component<IEditableTextblockProps, {}> {

    handleSelectChange(type:string, val:{value:string}) {
        this.props.componentUpdate(this.props.id, type, val.value);
        this.setState({
            [type]: val.value,
        });
    }

    getBlockSettings() {
        const {id, componentUpdate, width, color, font_weight, background, padding, font_size} = this.props;
        var width_options = generateOptions('%', 10, 11);
        var padding_options = generateOptions('px', 5, 21);
        var font_size_options = generateOptions('px', 1, 60);
        var font_weight_options = generateOptions('', 100, 10);
        return (
            <div>
                <SelectComponent value={width}
                                 options={ width_options }
                                 type='width' label='Width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={padding}
                                 options={ padding_options }
                                 type='padding' label='Padding'
                                 cUpdate={ componentUpdate } id={ id }/>
                <SelectComponent value={font_size}
                                 options={ font_size_options } type='font_size'
                                 label='Font-size' cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={font_weight}
                                 options={ font_weight_options }
                                 type='font_weight'
                                 label='Font-weight' cUpdate={ componentUpdate }
                                 id={ id }/>
                <ColorSelect value={background} type='background'
                             label='Block Background'
                             cUpdate={ componentUpdate }
                             id={ id }/>
                <ColorSelect value={color} type='color'
                             label='Text Color'
                             cUpdate={ componentUpdate }
                             id={ id }/>
            </div>
        );
    }

    onEditorChange(type:string, editorState:any, html:string, rawstate:string) {
        if (type == 'editor1') {
            this.props.componentUpdate(this.props.id, 'html1', html);
        }
        if (type == 'editor2') {
            this.props.componentUpdate(this.props.id, 'html2', html);
        }
        this.props.componentUpdate(this.props.id, type, rawstate);
    }

    getTextEditorTab() {
        let componentUpdate = this.props.componentUpdate;
        let id = this.props.id;
        let doublecolumns_options:[ISelectOption] = [
            {value: true, label: 'Yes'},
            {value: false, label: 'No'},
        ];
        let doublecols =  <SelectComponent value={this.props.doublecolumns}
                                           options={ doublecolumns_options }
                                           type='doublecolumns'
                                           label='Two columns'
                                           cUpdate={ componentUpdate }
                                           id={ id }/>;
        let editor1 = <LpEditor rawstate={this.props.raw1state} type="editor1"
                                onEditorChange={this.onEditorChange.bind(this)}/>;
        let editor2 = <LpEditor rawstate={this.props.raw2state} type="editor2"
                                onEditorChange={this.onEditorChange.bind(this)}/>;
        if (this.props.doublecolumns) {
            var column1:IEditorTab = {
                id: 1,
                label: 'Column 1',
                content: editor1
            }
            var column2:IEditorTab = {
                id: 2,
                label: 'Column 2',
                content: editor2
            }
            const tabs:[ IEditorTab ] = [column1, column2];
            return (
                <div className="text-edit">
                    { doublecols }
                    <EditBarTabs tabs={ tabs }/>
                </div>
            );
        } else {
            return (
                <div className="text-edit">
                    { doublecols }
                    { editor1 }
                </div>
            );
        }
    }

    render() {
        let settings = {
            id: 1,
            label: 'Block Settings',
            content: this.getBlockSettings(),
        }
        let editor = {
            id: 2,
            label: 'Text Editor',
            content: this.getTextEditorTab(),
        }
        const tabs:[ IEditorTab ] = [settings, editor];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}

export default EditableTextblockEdit;