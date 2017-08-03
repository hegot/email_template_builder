import React from "react";
import {generateOptions} from "../../../includes/HelperFunctions";
import {
    IEditorTab,
    ISelectOption,
    IEditableButtonProps
} from "../../../includes/Interfaces";
import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import UrlField from "../../ReusableComponents/UrlField";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";

class EditableButtonEdit extends React.Component<IEditableButtonProps, {}> {

    handleTextChange(event) {
        this.props.componentUpdate(this.props.id, 'text', event.target.value);
    }

    handleLinkChange(value) {
        if (value) {
            this.props.componentUpdate(this.props.id, 'link', value);
        }
    }

    getBlockSettings() {
        let width_options:[ISelectOption] = generateOptions('px', 10, 21);
        width_options.push({value: 'auto', label: 'auto'});
        let padding_options = generateOptions('px', 1, 21);
        let font_size_options = generateOptions('px', 1, 60);
        let font_weight_options = generateOptions('', 100, 10);
        let text_align_options:[ISelectOption] = [
            {value: 'center', label: 'center'},
            {value: 'left', label: 'left'},
            {value: 'right', label: 'right'},
        ];
        let componentUpdate = this.props.componentUpdate;
        let id = this.props.id;
        return (
            <div>
                <SelectComponent value={this.props.width}
                                 options={ width_options }
                                 type='width' label='Width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={this.props.padding}
                                 options={ padding_options }
                                 type='padding' label='Padding'
                                 cUpdate={ componentUpdate } id={ id }/>
                <SelectComponent value={this.props.font_size}
                                 options={ font_size_options } type='font_size'
                                 label='Font-size' cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={this.props.font_weight}
                                 options={ font_weight_options }
                                 type='font_weight'
                                 label='Font-weight' cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={this.props.text_align}
                                 options={ text_align_options }
                                 type='text_align'
                                 label='Align' cUpdate={ componentUpdate }
                                 id={ id }/>
                <ColorSelect value={this.props.background} type='background'
                             label='Block Background'
                             cUpdate={ componentUpdate }
                             id={ id }/>
                <ColorSelect value={this.props.color} type='color'
                             label='Text Color'
                             cUpdate={ componentUpdate } id={ id }/>
            </div>
        );
    }

    getButtonSettings() {
        let border_style_options:[ISelectOption] = [
            {value: 'none', label: 'none'},
            {value: 'solid', label: 'solid'},
            {value: 'dotted', label: 'dotted'},
            {value: 'dashed', label: 'dashed'},
            {value: 'double', label: 'double'},
            {value: 'groove', label: 'groove'},
            {value: 'ridge', label: 'ridge'},
            {value: 'inset', label: 'inset'},
            {value: 'outset', label: 'outset'},
        ];
        let border_width_options = generateOptions('px', 1, 6);
        let componentUpdate = this.props.componentUpdate;
        let id = this.props.id;
        return (
            <div>
                <div className="prop-edit">
                    <label>Button Text:</label>
                    <input type="text" className="text-edit"
                           value={ this.props.text }
                           onChange={ this.handleTextChange.bind(this)}/>
                </div>
                <div className="prop-edit">
                    <UrlField value={ this.props.link }
                              onChange={ this.handleLinkChange.bind(this) }
                              errorMessage="Email/Url is not valid"
                              label="Button Link:"
                    />
                </div>
                <SelectComponent value={this.props.border_style}
                                 options={ border_style_options }
                                 type='border_style'
                                 label='Border-style'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={this.props.border_width}
                                 options={ border_width_options }
                                 type='border_width'
                                 label='Border-width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <ColorSelect value={this.props.border_color} type='border_color'
                             label='Border Color' cUpdate={ componentUpdate }
                             id={ id }/>
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
            label: 'Button Settings',
            content: this.getButtonSettings(),
        }
        const tabs:[ IEditorTab ] = [settings, editor];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}

export default EditableButtonEdit;