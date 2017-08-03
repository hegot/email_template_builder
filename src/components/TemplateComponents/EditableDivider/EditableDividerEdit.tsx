import React from "react";
import {generateOptions} from "../../../includes/HelperFunctions";
import SelectComponent from "../../ReusableComponents/SelectComponent";
import ColorSelect from "../../ReusableComponents/ColorSelect";
import {
    ISelectOption,
    IEditableDividerProps
} from "../../../includes/Interfaces";

class EditableDividerEdit extends React.Component<IEditableDividerProps, {}> {

    render() {
        const {width, padding, border_style, border_width, border_color} = this.props;
        let padding_options = generateOptions('px', 1, 31);
        let width_options = generateOptions('%', 10, 11);
        let border_style_options:[ISelectOption] = [
            {value: 'solid', label: 'solid'},
            {value: 'dotted', label: 'dotted'},
            {value: 'dashed', label: 'dashed'},
            {value: 'double', label: 'double'},
            {value: 'ridge', label: 'ridge'},
        ];
        let border_width_options = generateOptions('px', 1, 15);
        let componentUpdate = this.props.componentUpdate;
        let id = this.props.id;
        return (
            <div>
                <SelectComponent value={width} options={ width_options }
                                 type='width' label='Width'
                                 cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={padding} options={ padding_options }
                                 type='padding' label='Padding'
                                 cUpdate={ componentUpdate } id={ id }/>
                <SelectComponent value={border_style}
                                 options={ border_style_options }
                                 type='border_style'
                                 label='Style' cUpdate={ componentUpdate }
                                 id={ id }/>
                <SelectComponent value={border_width}
                                 options={ border_width_options }
                                 type='border_width'
                                 label='Height' cUpdate={ componentUpdate }
                                 id={ id }/>
                <ColorSelect value={border_color} type='border_color'
                             label='Border Color' cUpdate={ componentUpdate }
                             id={ id }/>
            </div>
        );
    }
}

export default EditableDividerEdit;