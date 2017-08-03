import React from "react";
import {ISelectOption} from "../../../includes/Interfaces";
import Select from 'react-select';

interface ISelectProps {
  id:number;
  label?:string;
  value:string|number|boolean;
  options:[ISelectOption];
  type:string;
  cUpdate:(id:number, type:string, value:string) => void;
}

class SelectComponent extends React.Component<ISelectProps, {}> {

  handleChange(type:string, val:any) {
    val = val.value;
    this.props.cUpdate(this.props.id, type, val);
  }

  render() {
    const {label, value, options, type} = this.props;

    return (
      <div className="prop-edit">
        <label>{ label }</label>
        <Select
          name="form-field-name"
          value={ value }
          options={ options }
          clearable={ false }
          onChange={this.handleChange.bind(this, type)}
        />
      </div>
    );
  }
}


export default SelectComponent;
