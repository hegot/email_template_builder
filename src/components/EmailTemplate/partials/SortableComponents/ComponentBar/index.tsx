import React from "react";
import {Rootpath} from "../../../../../includes/Config";

interface IComponentBarProps {
    sortableGroupDecorator:()  => void;
}

interface IComponentBarState {
    components:[
        {
            id:string;
            text:string;
            img:string;
        }
        ];
}

class ComponentBar extends React.Component<IComponentBarProps, IComponentBarState> {
    constructor(props) {
        super(props);

        var imagepath = Rootpath + 'images/';
        this.state = {
            components: [
                {
                    id: 'EditableTextblock',
                    text: 'Text',
                    img: imagepath + 'text.jpg'
                },
                {
                    id: 'EditableTextImage',
                    text: 'Text & Image',
                    img: imagepath + 'imagewithcaption.jpg'
                },
                {
                    id: 'EditableImage',
                    text: 'Image',
                    img: imagepath + 'image.jpg'
                },
                {
                    id: 'EditableDivider',
                    text: 'Divider',
                    img: imagepath + 'divider.jpg'
                },
                {
                    id: 'EditableButton',
                    text: 'Button',
                    img: imagepath + 'button.jpg'
                },
                {
                    id: 'EditableSocialShare',
                    text: 'Social Share',
                    img: imagepath + 'social_share.jpg'
                },
                {
                    id: 'EditableVideo',
                    text: 'Video',
                    img: imagepath + 'video.jpg'
                },
                {
                    id: 'EditableFooter',
                    text: 'Footer',
                    img: imagepath + 'footer.jpg'
                },
                {
                    id: 'EditableContent',
                    text: 'News, Blogs & Alerts',
                    img: imagepath + 'footer.jpg'
                },
            ]
        };
    }

    render() {
        let components = this.state.components;
        const components_rendered = components.map((item) => {
            return (
                <div className="item component" key={ item.id }
                     value={ item.id }>
                    <img src={item.img}/>
                    <div className="meta">
                        {item.text}
                    </div>
                </div>
            );
        });

        return (
            <div className="col-md-4 tpl-column-right group-list"
                 ref={this.props.sortableGroupDecorator}>
                { components_rendered }
            </div>
        );
    }
}


export default ComponentBar;