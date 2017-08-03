import ImageWidget from "../../ReusableComponents/ImageUpload/ImageWidget";
import {generateOptions} from "../../../includes/HelperFunctions";
import ImageHandle from "../../ReusableComponents/ImageUpload/ImageHandle";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import UrlField from "../../ReusableComponents/UrlField";
import {ISelectOption} from "../../../includes/Interfaces";

class EditableImageEdit extends ImageHandle {

    get_block_settings() {
        const {id, componentUpdate, width, text_align, padding, link} = this.props;
        let width_options = generateOptions('%', 10, 11);
        let padding_options = generateOptions('px', 5, 21);
        let text_align_options:[ISelectOption] = [
            {value: 'center', label: 'center'},
            {value: 'left', label: 'left'},
            {value: 'right', label: 'right'},
        ];
        return (
            <div>
                <SelectComponent value={width}
                                 options={ width_options }
                                 type='width' label='Size'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={padding}
                                 options={ padding_options }
                                 type='padding' label='Padding'
                                 cUpdate={ componentUpdate } id={ id }/>
                <SelectComponent value={text_align}
                                 options={ text_align_options }
                                 type='text_align'
                                 label='Align' cUpdate={ componentUpdate }
                                 id={ id }/>
                <div className="prop-edit">
                    <UrlField value={ link }
                              onChange={ this.handleLinkChange.bind(this) }
                              errorMessage="Email/Url is not valid"
                              label="Action Link:"
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.get_block_settings() }
                <ImageWidget
                    handleImageUpload={ this.handleImageUpload.bind(this) }
                    handleImageRemove={ this.handleImageRemove.bind(this) }
                    fid={ this.props.image.fid }
                    path={ this.props.image.path }
                />
            </div>
        );
    }
}

export default EditableImageEdit;