import React from "react";
import { IComponent } from "../../../includes/Interfaces";

interface ITemplateHtmlProps{
    updateRawHtml:(html:any)=> void;
    allComponents: any;
    components:[ IComponent ];
}

class TemplateHtml extends React.Component<ITemplateHtmlProps, {}> {

    componentDidMount() {
        const html = this.refs.raw_html;
        this.props.updateRawHtml(html);
    }

    render() {
        let components = this.props.components;
        let allComponents = this.props.allComponents;
        const Item = (({value}) =>
                <div className="item">
                    { React.createElement(value.key, value.props) }
                </div>
        );

        return (
            <div id="before_save">
                <div className="group-list" ref="raw_html">
                    {components.map((item, index) => {
                        var key = item.component;
                        item.props.preview = true;
                        return <Item key={`item-${index}`} value={ {key:allComponents[key],props:item.props} }/>
                    })}
                </div>
            </div>
        );
    }
}


export default TemplateHtml;