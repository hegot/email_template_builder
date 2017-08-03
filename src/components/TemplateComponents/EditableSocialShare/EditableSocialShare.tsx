import React from "react";
import { Rootpath } from "../../../includes/Config";
import { IEditableSocialShareProps } from "../../../includes/Interfaces";

class EditableSocialShare extends React.Component<IEditableSocialShareProps, {}> {

    render() {
        const {active, icon_style, icon_color, width, color, font_weight, background, padding, components, font_size} = this.props;

        let styling:any = {
            width: width,
            fontWeight: font_weight,
            background: background,
            padding: padding,
            fontSize: font_size,
            margin: '0 auto',
            overflow: 'hidden',
        }
        let link_styling:any = {
            height: '24px',
            display: 'inline-block',
            margin: '1px 5px',
            lineHeight: '24px',
            color: color,
        }
        let img_styling:any = {
            width: 'auto',
            height: '100%',
            float: 'left',
            margin: '0 5px 0 0'
        }
        if (active) {
            styling.border = '2px solid #666666';
        }
        return (
            <div style={ styling }>
                {components.map((item, index) => {
                    var src = Rootpath + 'images/socials/' + icon_style + '-' + icon_color + '-' + item.type + '.png';
                    return <a key={`item-${index}`} href={ item.url } style={ link_styling }>
                        <img src={ src } style={ img_styling }/>
                        {item.text}
                    </a>
                })}
            </div>
        );
    }
}


export default EditableSocialShare;