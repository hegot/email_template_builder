import EditBarTabs from "../../ReusableComponents/EditBarTabs";
import {generateOptions} from "../../../includes/HelperFunctions";
import ImageWidget from "../../ReusableComponents/ImageUpload/ImageWidget";
import ImageHandle from "../../ReusableComponents/ImageUpload/ImageHandle";
import LpEditor from "../../ReusableComponents/LpEditor";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";
import UrlField from "../../ReusableComponents/UrlField";
import {IEditorTab, ISelectOption} from "../../../includes/Interfaces";

class EditableTextImageEdit extends ImageHandle {

    onEditorStateChange(type:string, editorState:any, html:string, rawstate:string) {
        this.props.componentUpdate(this.props.id, 'html', html);
        this.props.componentUpdate(this.props.id, type, rawstate);
    }

    getBlockSettings() {
        const {width, color, font_weight, background, padding, font_size, id, componentUpdate} = this.props;
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
                             cUpdate={ componentUpdate }
                             id={ id }/>
            </div>
        );
    }

    getImageTabs() {
        const {image, link, rawstate, imagecolumn, id, componentUpdate, imagewidth, imagepadding} = this.props;
        let imagecolumn_options:[ISelectOption] = [
            {value: 1, label: 'left'},
            {value: 2, label: 'right'},
        ];
        var width_options:[ISelectOption] = [
            {value: 25, label: '25%'},
            {value: 33, label: '33%'},
            {value: 50, label: '50%'},
            {value: 66, label: '66%'},
            {value: 75, label: '75%'},
        ];
        let padding_options = generateOptions('px', 1, 21);
        let imagewidget =
            <div>
                <ImageWidget
                    handleImageUpload={ this.handleImageUpload.bind(this) }
                    handleImageRemove={ this.handleImageRemove.bind(this) }
                    fid={ image.fid }
                    path={ image.path }
                />
                <SelectComponent value={imagewidth}
                                 options={ width_options }
                                 type='imagewidth' label='Image column width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={imagepadding}
                                 options={ padding_options }
                                 type='imagepadding'
                                 label='Image column padding'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <div className="prop-edit">
                    <UrlField value={ link }
                              onChange={ this.handleLinkChange.bind(this) }
                              errorMessage="Email/Url is not valid"
                              label="Action Link:"
                    />
                </div>
            </div>;
        let editor = <LpEditor
            rawstate={rawstate}
            type="editor1"
            onEditorChange={this.onEditorStateChange.bind(this)}
        />;
        if (imagecolumn == 1) {
            var column1content = imagewidget;
            var column2content = editor;
        } else {
            var column1content = editor;
            var column2content = imagewidget;
        }
        let column1:IEditorTab = {
            id: 1,
            label: 'Column 1',
            content: column1content,
        }
        let column2:IEditorTab = {
            id: 2,
            label: 'Column 2',
            content: column2content,
        }
        const tabs:[IEditorTab] = [column1, column2];
        return (
            <div className="text-edit">
                <SelectComponent value={imagecolumn}
                                 options={ imagecolumn_options }
                                 type='imagecolumn'
                                 label='Imagecolumn' cUpdate={ componentUpdate }
                                 id={ id }/>
                <EditBarTabs tabs={ tabs }/>
            </div>
        );

    }

    render() {
        let settings:IEditorTab = {
            id: 1,
            label: 'Block Settings',
            content: this.getBlockSettings(),
        }
        let editor:IEditorTab = {
            id: 2,
            label: 'Image/Text Editor',
            content: this.getImageTabs(),
        }
        const tabs:[IEditorTab] = [settings, editor];
        return (
            <EditBarTabs tabs={ tabs }/>
        );
    }
}

export default EditableTextImageEdit;