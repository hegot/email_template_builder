import React from "react";
import {IEditableButtonProps} from "../../../includes/Interfaces";

class EditableButton extends React.Component<IEditableButtonProps, {}> {

    render_button_inner() {
        if (this.props.link) {
            return (
                <a style={{ color: 'inherit' }}
                   href={ this.props.link }>{ this.props.text }</a>
            );
        } else {
            return this.props.text;
        }
    }

    render() {
        const {active, width, color, font_weight, background, padding, font_size, border_style, border_width, border_color, text_align} = this.props;
        let styling:any = {
            width: '100%',
            height: '100%',
            textAlign: text_align,
        }
        let inner_styling:any = {
            width: width,
            color: color,
            fontWeight: font_weight,
            background: background,
            padding: padding,
            fontSize: font_size,
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '3px',
            display: 'inline-block',
            marginTop: '3px',
            borderStyle: border_style,
            borderWidth: border_width,
            borderColor: border_color,
            textAlign: 'center',
        }
        if (active) {
            styling.border = '2px solid #666666';
        }

        return (
            <div style={ styling }>
                <div style={ inner_styling }>
                    { this.render_button_inner() }
                </div>
            </div>
        );
    }
}

export default EditableButton;
