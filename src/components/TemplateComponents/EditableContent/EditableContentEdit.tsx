import React from "react";
import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import {generateOptions} from "../../../includes/HelperFunctions";
import Select from 'react-select';
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";

import {
    IEditorTab,
    ISelectOption,
    IEditableContentProps
} from "../../../includes/Interfaces";

class EditableContentEdit extends React.Component<IEditableContentProps, {}> {

    handleSelectChange(type, val) {
        this.props.componentUpdate(this.props.id, type, val.value);
    }

    handleTextChange(event) {
        this.props.componentUpdate(this.props.id, 'read_more', event.target.value);
    }

    getBlockSettings() {
        const {id, componentUpdate, width, color, font_weight, background, padding, font_size} = this.props;
        let width_options = generateOptions('%', 10, 11);
        let padding_options = generateOptions('px', 5, 21);
        let font_size_options = generateOptions('px', 1, 60);
        let font_weight_options = generateOptions('', 100, 10);
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
                             cUpdate={ componentUpdate } id={ id }/>
            </div>
        );
    }

    xmlHttpHelper() {
        let apiURL = window.location.protocol + "//" + window.location.host + '/email_tpl/get_data';
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", apiURL);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        return xmlhttp;
    }


    handleOptionChange(val) {
        let value = val.value;
        this.props.componentUpdate(this.props.id, 'selectedOption', value);
        var component = this;
        let xmlhttp = this.xmlHttpHelper();
        let data = "type=" + value;
        xmlhttp.onload = function (xhr:any) {
            if (xhr.target.status == 200) {
                let options = JSON.parse(xhr.target.response);
                if (options.length == 0) {
                    options = '';
                }
                component.props.componentUpdate(component.props.id, 'options', options);
            } else {
                console.log(xhr.target.statusText);
            }
        }
        xmlhttp.send(data);
    }

    handleTitleChange(result) {
        if (result.value) {
            var component = this;
            let xmlhttp = this.xmlHttpHelper();
            let data = "nid=" + parseInt(result.value);
            xmlhttp.onload = function (xhr:any) {
                if (xhr.target.status == 200) {
                    let response = xhr.target.response;
                    if (response.length > 1) {
                        component.props.componentUpdate(component.props.id, 'selectedTitle', result.value);
                        component.props.componentUpdate(component.props.id, 'html', response);
                    }
                } else {
                    console.log(xhr.target.statusText);
                }
            }
            xmlhttp.send(data);
        }
    }

    renderTitleSelect() {
        if (this.props.options) {
            return (
                <Select
                    name="title-select"
                    clearable={ false }
                    value={ this.props.selectedTitle }
                    options={ this.props.options }
                    onChange={ this.handleTitleChange.bind(this) }
                />
            )
        }
    }


    getContentEditorTab() {
        let content_options:[ISelectOption] = [
            {value: 'news', label: 'News'},
            {value: 'blog', label: 'Blog'},
            {value: 'alert', label: 'Alert'},
        ];
        return (
            <div className="retrieve-content">
                <div className="prop-edit">
                    <label>Read more text:</label>
                    <input type="text" className="text-edit"
                           value={ this.props.read_more }
                           onChange={ this.handleTextChange.bind(this)}/>
                </div>
                <Select
                    name="content-type-select"
                    clearable={ false }
                    value={ this.props.selectedOption }
                    options={ content_options }
                    onChange={ this.handleOptionChange.bind(this) }
                />
                <div className="select-title">
                    { this.renderTitleSelect() }
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
            label: 'Content Editor',
            content: this.getContentEditorTab(),
        }
        const tabs:[IEditorTab] = [settings, editor];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}

export default EditableContentEdit;