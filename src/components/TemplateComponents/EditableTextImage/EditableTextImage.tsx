import React from "react";
import renderHTML from 'react-render-html';
import {ITextImageProps} from "../../../includes/Interfaces";

class EditableTextImage extends React.Component<ITextImageProps, {}> {

    renderImage() {
        const {image, imagewidth, imagepadding, imagecolumn} = this.props;
        let float = (imagecolumn == 1) ? 'left' : 'right';
        var inner_styling:any = {
            padding: '0 ' + imagepadding,
            width: imagewidth + '%',
            float: float,
        };
        var image_styling:any = {
            width: '100%',
            height: 'auto',
        };
        let link:any = this.props.link;
        if (link.length > 0) {
            return (
                <a style={ inner_styling } href={this.props.link}>
                    <img src={ image.path } style={ image_styling }/>
                </a>
            );
        } else {
            return (
                <div style={ inner_styling }>
                    <img src={ image.path } style={ image_styling }/>
                </div>
            );
        }
    }

    render() {
        const {active, html, width, color, font_weight, background, padding, text_align, font_size, imagewidth, imagecolumn} = this.props;
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
        let test_float = (imagecolumn == 1) ? 'right' : 'left';
        let text_width = 100 - imagewidth;
        let column_styling:any = {
            width: text_width + '%',
            float: test_float,
        }
        if (imagecolumn == 1) {
            return (
                <div style={ styling }>
                    {this.renderImage()}
                    <div style={ column_styling }>
                        {renderHTML(html)}
                    </div>
                </div>
            );
        } else {
            return (
                <div style={ styling }>
                    <div style={ column_styling }>
                        {renderHTML(html)}
                    </div>
                    {this.renderImage()}
                </div>
            );
        }
    }
}

export default EditableTextImage;