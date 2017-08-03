import React from "react";
import renderHTML from 'react-render-html';
import {IEditableTextblockProps} from "../../../includes/Interfaces";

class EditableTextblock extends React.Component<IEditableTextblockProps, {}> {

    render() {
        const {active, doublecolumns, html1, html2, width, color, font_weight, background, padding, text_align, font_size} = this.props;
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
        let column_styling:any = {
            width: '50%',
            float: 'left',
            padding: '10px',
        }

        function columns_render(doublecolumns:boolean, html1:string, html2:string) {
            if (doublecolumns) {
                return (
                    <div>
                        <div style={ column_styling }>
                            {renderHTML(html1)}
                        </div>
                        <div style={ column_styling }>
                            {renderHTML(html2)}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        {renderHTML(html1)}
                    </div>
                );
            }

        }

        return (
            <div style={ styling }>
                { columns_render(doublecolumns, html1, html2) }
            </div>
        );
    }
}

export default EditableTextblock;