import React from "react";
import {IEditorTab} from "../../../includes/Interfaces";

interface IEditBarTabsProps {
    tabs:[ IEditorTab ];
}

interface IEditBarTabsState {
    selected_tab:number;
}

class EditBarTabs extends React.Component<IEditBarTabsProps, IEditBarTabsState> {
    constructor(props:IEditBarTabsProps) {
        super();
        this.state = {selected_tab: 1};
    }

    clickHandler(id:number, event:any) {
        this.setState({
            selected_tab: id
        });
    }

    _renderTab() {
        function render_header(tab:IEditorTab) {
            let activeClass = (this.state.selected_tab === tab.id ? 'tab_header active' : 'tab_header not-active');
            return (
                <div className={ activeClass } key={ tab.id }
                     onClick={this.clickHandler.bind(this, tab.id)}>
                    { tab.label }
                </div>
            );
        }

        function render_content(tab:IEditorTab) {
            let tabActiveClass = (this.state.selected_tab === tab.id ? 'tab_content active' : 'tab_content not-active');
            return (
                <div className={ tabActiveClass } key={ tab.id }>
                    { tab.content }
                </div>
            );
        }

        const {tabs} = this.props
        return (
            <div className="tabs">
                <div className="tab_header_wrap">
                    { tabs.map(render_header.bind(this)) }
                </div>
                <div className="tab_content_wrap">
                    { tabs.map(render_content.bind(this)) }
                </div>
            </div>
        );
    }


    render() {
        return (
            <div className="tabs_block">
                {this._renderTab()}
            </div>
        );
    }

}

export default EditBarTabs;