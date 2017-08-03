import React from "react";
import {IImageProps} from "../../../includes/Interfaces";

class EditableImage extends React.Component<IImageProps, {}> {

    renderWithLink() {
        const {width, padding, image} = this.props;
        let inner_styling:any = {
            padding: padding,
            width: width,
            display: 'inline-block',
        };
        let image_styling:any = {
            width: '100%',
            height: 'auto',
        };
        let link:any = this.props.link;
        if (link.length > 0) {
            return (
                <a style={ inner_styling } href={link}>
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
        const {active, text_align} = this.props;

        let styling:any = {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            textAlign: text_align,
        };
        if (active) {
            styling.border = '2px solid #666666';
        }

        return (
            <div style={ styling }>
                {this.renderWithLink()}
            </div>
        );
    }
}

export default EditableImage;