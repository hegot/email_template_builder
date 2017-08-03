import React from "react";
import {IEditableDividerProps} from "../../../includes/Interfaces";

class EditableDivider extends React.Component<IEditableDividerProps, {}> {

    render() {
        const {width, padding, border_style, border_width, border_color, active} = this.props;
        let styling:any = {
            height: '100%',
            width: '100%',
            margin: '0 auto',
            overflow: 'hidden',
            textAlign: 'center',
        }
        let inner_styling:any = {
            borderTopStyle: border_style,
            borderTopWidth: border_width,
            borderTopColor: border_color,
            overflow: 'hidden',
            height: '0px',
            width: width,
            marginTop: padding,
            marginBottom: padding,
        }
        if (active) {
            styling.border = '2px solid #666666';
        }
        return (
            <div style={ styling }>
                <hr style={ inner_styling }/>
            </div>
        );
    }
}

export default EditableDivider;
