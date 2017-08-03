import React from "react";
import renderHTML from 'react-render-html';
import {Rootpath} from "../../../includes/Config";
import {IEditableVideoProps} from "../../../includes/Interfaces";

class EditableVideo extends React.Component<IEditableVideoProps, {width:string;}> {

    onImgLoad({target:img}) {
        if (img.offsetWidth != this.props.preview_width && this.props.componentUpdate) {
            this.props.componentUpdate(this.props.id, 'preview_width', img.offsetWidth);
        }
    }

    render_video() {
        const {preview, video, videotype, preview_src} = this.props;
        if (preview == true) {
            if (videotype == 'youtube') {
                var src = 'https://www.youtube.com/embed/' + video;
                return (
                    <iframe width="560" height="315" src={ src }
                            frameBorder="0"></iframe>
                );
            } else if (videotype == 'vimeo') {
                var src = 'https://player.vimeo.com/video/' + video;
                return (
                    <iframe src={ src } width="640" height="268"
                            frameBorder="0"></iframe>
                );
            }

        } else {
            var imagepath = 'url("' + Rootpath + '/images/video_play.png")';
            var divstyle:any = {
                position: 'relative',
            };
            var buttonstyle:any = {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '68px',
                height: '48px',
                marginLeft: '-34px',
                marginTop: '-24px',
                cursor: 'pointer',
                background: imagepath,
                backgroundSize: '100% 100%',
                opacity: '0.8',
                border: '0px',
            };
            if (preview_src) {
                return (
                    <div style={ divstyle }>
                        <button style={ buttonstyle }/>
                        <img onLoad={this.onImgLoad.bind(this)}
                             src={ preview_src }/>
                    </div>
                );
            } else {
                let empty_video = Rootpath + 'images/empty-video.png';
                return (
                    <div style={ divstyle }>
                        <img onLoad={this.onImgLoad.bind(this)}
                             src={ empty_video }/>
                    </div>
                );
            }
        }
    }

    render() {
        const {active, html, width, color, font_weight, background, padding, text_align, font_size} = this.props;
        var styling:any = {
            width: width,
            color: color,
            fontWeight: font_weight,
            background: background,
            padding: padding,
            textAlign: text_align,
            fontSize: font_size,
            overflow: 'hidden',
        }
        var caption_style = {
            margin: '0 auto',
            width: this.props.preview_width,
        }
        if (active) {
            styling.border = '2px solid #666666';
        }
        return (
            <div style={ styling }>
                <div style={ caption_style }>
                    { this.render_video() }
                    <br />
                    {renderHTML(html)}
                </div>
            </div>
        );
    }
}

export default EditableVideo;