import React from "react";
import {CompactPicker} from 'react-color';

interface IColorSelectProps {
  id:number;
  label?:string;
  value:string|boolean;
  type:string;
  cUpdate:(id:number, type:string, value:string) => void;
}

class ColorSelect extends React.Component<IColorSelectProps, {}> {

  handleChange(type:string, val:any) {
    val = val.hex;
    this.props.cUpdate(this.props.id, type, val);
  }

  render() {
    const {label, value, type} = this.props;

    return (
      <div className="color-edit">
        <label>{ label }</label>
        <div className="colorpicker">
          <CompactPicker
            color={ value }
            onChangeComplete={ this.handleChange.bind(this, type) }
          />
        </div>
      </div>
    );
  }
}

export default ColorSelect;
