import React from "react";
import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import {generateOptions} from "../../../includes/HelperFunctions";
import LpEditor from "../../ReusableComponents/LpEditor";
import {IEditorTab,IEditableVideoProps} from "../../../includes/Interfaces";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";

class EditableVideoEdit extends React.Component<IEditableVideoProps, {}> {

    getBlockSettings() {
        const {id, componentUpdate, width, color, font_weight, background, padding, font_size} = this.props;
        var width_options = generateOptions('%', 10, 11);
        var padding_options = generateOptions('px', 5, 21);
        var font_size_options = generateOptions('px', 1, 60);
        var font_weight_options = generateOptions('', 100, 10);
        return (
            <div>
                <SelectComponent value={width}
                                 options={ width_options }
                                 type='width' label='Width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={padding}
                                 options={ padding_options }
                                 type='padding' label='Padding'
                                 cUpdate={ componentUpdate } id={ id }/>
                <SelectComponent value={font_size}
                                 options={ font_size_options } type='font_size'
                                 label='Font-size' cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={font_weight}
                                 options={ font_weight_options }
                                 type='font_weight'
                                 label='Font-weight' cUpdate={ componentUpdate }
                                 id={ id }/>
                <ColorSelect value={background} type='background'
                             label='Block Background'
                             cUpdate={ componentUpdate }
                             id={ id }/>
                <ColorSelect value={color} type='color'
                             label='Text Color'
                             cUpdate={ componentUpdate }
                             id={ id }/>
            </div>
        );
    }

    handleVideoChange(event:any) {

        let string = event.target.value;
        let substring = [
            {type: 'youtube', url: 'https://youtu.be/'},
            {type: 'youtube', url: 'https://www.youtube.com/watch?v='},
            {type: 'vimeo', url: 'https://vimeo.com/'},
        ];
        let video:string = '';
        let videotype = '';
        for (var i = 0; i < substring.length; i++) {
            if (string.indexOf(substring[i].url) !== -1) {
                video = string.replace(substring[i].url, '');
                videotype = substring[i].type;
            }
        }
        if (video && videotype == 'youtube') {
            let preview_src = 'http://img.youtube.com/vi/' + video + '/0.jpg';
            this.props.componentUpdate(this.props.id, 'preview_src', preview_src);
        } else if (video && videotype == 'vimeo') {
            var req = new XMLHttpRequest();
            var src
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    var response = req.responseText;
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(response, "text/xml");
                    var img_node = xmlDoc.getElementsByTagName("thumbnail_large");
                    if (img_node[0]) {
                        src = img_node[0].innerHTML;
                    }
                }
            };
            if (src) {
                this.props.componentUpdate(this.props.id, 'preview_src', src);
            }
            var url = 'http://vimeo.com/api/v2/video/' + video + '.xml';
            req.open('GET', url);
            req.send(null);
        }
        this.props.componentUpdate(this.props.id, 'video', video);
        this.props.componentUpdate(this.props.id, 'videotype', videotype);
        this.props.componentUpdate(this.props.id, 'videourl', string);
    }

    onEditorChange(type:string, editorState:any, html:string, rawstate:string) {
        this.props.componentUpdate(this.props.id, 'html', html);
        this.props.componentUpdate(this.props.id, type, rawstate);
    }

    getTextEditorTab() {
        return (
            <div>
                <div className="prop-edit">
                    <label>Video (YouTube/Vimeo) URL:</label>
                    <input type="text" className="video-url"
                           value={ this.props.videourl }
                           onChange={ this.handleVideoChange.bind(this) }/>

                    <span>
                        We'll link your video preview image to this URL. Preview images are generated automatically for YouTube and Vimeo URLs.
                    </span>
                </div>
                <div className="prop-edit">
                    <label>Caption:</label>
                    <LpEditor rawstate={this.props.rawstate} type="editor"
                              onEditorChange={this.onEditorChange.bind(this)}/>
                </div>
            </div>
        );
    }


    render() {

        var settings = {
            id: 1,
            label: 'Block Settings',
            content: this.getBlockSettings(),
        }
        var editor = {
            id: 2,
            label: 'Content',
            content: this.getTextEditorTab(),
        }
        const tabs:[ IEditorTab ] = [settings, editor];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}


export default EditableVideoEdit;