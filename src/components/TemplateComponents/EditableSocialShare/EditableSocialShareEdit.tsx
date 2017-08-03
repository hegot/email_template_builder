import React from "react";
import {CompactPicker} from 'react-color';
import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import {arrayMove, generateOptions} from "../../../includes/HelperFunctions";
import Select from 'react-select';
import {Rootpath} from "../../../includes/Config";
import UrlField from "../../ReusableComponents/UrlField";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";
import {
    IEditorTab,
    ISelectOption,
    IEditableSocialShareProps
} from "../../../includes/Interfaces";

class EditableSocialShareEdit extends React.Component<IEditableSocialShareProps, {}> {

    handleComponentsChange(type, val) {
        this.props.componentUpdate(this.props.id, type, val);
    }

    get_block_settings() {
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

    moveUp(index:number) {
        let newindex;
        if (index == 0) {
            let count = this.props.components.length;
            newindex = count - 1;
        } else {
            newindex = index - 1;
        }
        let components = arrayMove(this.props.components, index, newindex);
        this.handleComponentsChange('components', components);
    }

    moveDown(index:number) {
        let newindex;
        let count = this.props.components.length - 1;
        if (index == count) {
            newindex = 0;
        } else {
            newindex = index + 1;
        }
        let components = arrayMove(this.props.components, index, newindex);
        this.handleComponentsChange('components', components);
    }

    removeItem(index:number) {
        let components = this.props.components;
        components.splice(index, 1);
        this.handleComponentsChange('components', components);
    }

    onTextChange(index:number, item) {
        let components = this.props.components;
        let newtext = item.target.value;
        components[index].text = newtext;
        this.handleComponentsChange('components', components);
    }

    onUrlChange(index:number, value) {
        let components = this.props.components;
        components[index].url = value;
        this.handleComponentsChange('components', components);
    }

    handleAddComponent(item) {
        let newcomponent = {
            type: item.value,
            text: '',
            url: '',
        }
        let components = this.props.components;
        components.push(newcomponent);
        this.handleComponentsChange('components', components);
    }


    renderAddComponent() {
        var components = this.props.components;
        var options = [];
        var socials = ['facebook', 'twitter', 'linkedin', 'pinterest', 'googleplus'];
        var exists = [];
        components.map((item, index) => {
            var type = item.type;
            if (socials.indexOf(type) > -1) {
                exists.push(type);
            }
        });
        let difference = socials.filter(x => exists.indexOf(x) == -1);
        difference.map((item, index) => {
            options.push({value: item, label: item});
        });
        if (options.length > 0) {
            return (
                <div className="add-service">
                    <label>Add another service</label>
                    <Select
                        name="form-field-name"
                        options={ options }
                        onChange={this.handleAddComponent.bind(this)}
                    />
                </div>
            );
        }
    }

    renderIconProps() {
        let icon_style_options:[ISelectOption] = [{
            value: 'solid',
            label: 'Solid'
        }, {value: 'outline', label: 'Outlined'}];
        let icon_color_options:[ISelectOption] = [{
            value: 'color',
            label: 'Color'
        }, {value: 'dark', label: 'Dark'}];
        let componentUpdate = this.props.componentUpdate;
        let id = this.props.id;
        return (
            <div>
                <div className="add-service">
                    <SelectComponent value={this.props.icon_style}
                                     options={ icon_style_options }
                                     type='icon_style'
                                     label='Icon style'
                                     cUpdate={ componentUpdate }
                                     id={ id }/>
                </div>
                <div className="add-service">
                    <SelectComponent value={this.props.icon_color}
                                     options={ icon_color_options }
                                     type='icon_color'
                                     label='Icon color'
                                     cUpdate={ componentUpdate }
                                     id={ id }/>
                </div>
            </div>
        );
    }

    get_components_tab() {
        const {icon_style, icon_color} = this.props;
        return (
            <div className="socials-list">
                { this.props.components.map((item, index) => {
                    var src = Rootpath + '/images/socials/' + icon_style + '-' + icon_color + '-' + item.type + '.png';
                    return <div key={`item-${index}`} className="socials-item">
                        <span className="up"
                              onClick={this.moveUp.bind(this, index)}/>
                        <span className="down"
                              onClick={this.moveDown.bind(this, index)}/>
                        <span className="remove"
                              onClick={this.removeItem.bind(this, index)}/>
                        <img src={ src }/>
                        <div className="socials-edit">
                            <label>Text</label>
                            <input type="text" value={ item.text }
                                   onChange={this.onTextChange.bind(this, index)}/>
                            <UrlField value={ item.url }
                                      onChange={this.onUrlChange.bind(this, index)}
                                      errorMessage="Url is not valid"
                                      label="URL"
                            />
                        </div>
                    </div>
                })}
                { this.renderAddComponent() }
                { this.renderIconProps() }
            </div>
        );
    }

    render() {
        let components = {
            id: 1,
            label: 'Content',
            content: this.get_components_tab(),

        }
        let settings = {
            id: 2,
            label: 'Block Settings',
            content: this.get_block_settings(),
        }
        const tabs:[ IEditorTab ] = [components, settings];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}

export default EditableSocialShareEdit;