import React from "react";
import renderHTML from 'react-render-html';
import {IEditableContentProps} from "../../../includes/Interfaces";

class EditableContent extends React.Component<IEditableContentProps, {}> {
    render() {
        const {active, html, width, color, font_weight, background, padding, text_align, font_size} = this.props;
        let styling:any = {
            width: width,
            color: color,
            fontWeight: font_weight,
            background: background,
            padding: padding,
            textAlign: text_align,
            fontSize: font_size,
            margin: '0 auto',
            overflow: 'hidden',
        }
        if (active) {
            styling.border = '2px solid #666666';
        }
        return (
            <div style={ styling }>
                {renderHTML(html)}
            </div>
        );
    }
}


export default EditableContent;