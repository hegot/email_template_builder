import React from "react";
import {allComponents} from "../../includes/AllComponents";
import {Components} from "../../includes/Config";
import SortableComponents from "./partials/SortableComponents";
import * as Helper from "../../includes/HelperFunctions";
import SkyLight from 'react-skylight';
import TemplateHtml from "../ReusableComponents/TemplateHtml";
import PreviewTemplate from "./partials/PreviewTemplate";
import Controls from "./partials/Controls";


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../css/template_edit.css';
import '../../../css/bootstrap.min.css';
import 'react-select/dist/react-select.css';


import {
    IEmailTemplateState,
    IComponent,
} from "../../includes/Interfaces";


var history = [];

class EmailTemplate extends React.Component<{}, IEmailTemplateState> {

    constructor() {
        super();
        let state:IEmailTemplateState = {
            components: Components,
            active_editor: -1,
            saved: false,
            history_index: 0,
            raw_tpl_html: '',
            sorting: false,
        };
        this.state = state;
        this.saveHistory();
    }


    historyPrev() {
        var newstate = Helper.historyPrevHelper(history, this.state);
        if (Object.keys(newstate).length > 0) {
            this.setState(newstate);
        }
    }

    historyNext() {
        var newstate = Helper.historyNextHelper(history, this.state);
        if (Object.keys(newstate).length > 0) {
            this.setState(newstate);
        }
    }

    handleSave() {
        var newstate = Helper.handleSaveHelper(this.state);
        this.setState(newstate);
        setTimeout((function () {
            this.setState({
                saved: false,
            });
        }).bind(this), 3000);
    }

    handleDelete(id) {
        var newstate = Helper.handleDeleteHelper(this.state, id);
        this.setState(newstate);
        this.saveHistory();
    }

    addComponent(id:string, index:number) {
        var newstate = Helper.addComponentHelper(this.state, id, index);
        this.setState(newstate);
        setTimeout((function () {
            this.setState({
                sorting: true,
            });
        }).bind(this), 500);
        this.saveHistory();
    }

    handleClose() {
        this.setState({
            active_editor: -1,
        });
    }

    saveHistory() {
        var newObject = JSON.parse(JSON.stringify(this.state.components));
        var item = JSON.stringify(newObject);
        history.push(item);
    }

    componentUpdate(component_id:string, prop_name:string, prop_value:any) {
        var newstate = Helper.componentUpdateHelper(this.state, component_id, prop_name, prop_value);
        this.setState(newstate);
        this.saveHistory();
    }

    itemsSorting(oldIndex:number, newIndex:number) {
        if(this.state.sorting){
            let components:[ IComponent ] = Helper.arrayMove(this.state.components, oldIndex, newIndex);
            this.setState({
                components: components,
            });
        }
    }

    componentEditHandler(component_id:number) {
        var newstate = Helper.componentEditHandlerHelper(this.state, component_id);
        if (newstate) {
            this.setState(newstate);
        }
    }

    afterModalOpen() {
        if (this.state.raw_tpl_html) {
            let preview = document.getElementById('raw_tpl');
            let raw_tpl_html:any = this.state.raw_tpl_html;
            preview.innerHTML = raw_tpl_html.innerHTML;
        }
    }

    updateRawHtml(html:string) {
        this.setState({
            raw_tpl_html: html,
        });
    }


    render() {
        var customstyles:any = {
            width: '940px',
            height: '800px',
            marginTop: '-400px',
            marginLeft: '-470px',
        };
        return (
            <div className="email-template">
                <Controls
                    historyPrev={ this.historyPrev.bind(this) }
                    historyNext={ this.historyNext.bind(this) }
                    handleSave={ this.handleSave.bind(this) }
                    refs={ this.refs }
                    saved={ this.state.saved }
                />
                <SortableComponents
                    components={ this.state.components}
                    active_editor={ this.state.active_editor}
                    componentUpdate={ this.componentUpdate.bind(this) }
                    handleClose={ this.handleClose.bind(this) }
                    componentEditHandler={ this.componentEditHandler.bind(this) }
                    handleDelete={ this.handleDelete.bind(this) }
                    addComponent={ this.addComponent.bind(this) }
                    itemsSorting={ this.itemsSorting.bind(this) }
                />
                <SkyLight dialogStyles={customstyles} hideOnOverlayClicked
                          ref="simpleDialog"
                          afterOpen={this.afterModalOpen.bind(this)}>
                    <PreviewTemplate />
                </SkyLight>
                <TemplateHtml updateRawHtml={this.updateRawHtml.bind(this)}
                              components={this.state.components}
                              allComponents={ allComponents }/>
            </div>
        );
    }
}

export default EmailTemplate;