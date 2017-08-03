import * as React from "react";

interface IUrlFieldProps {
    value?:string;
    errorMessage?:string;
    onChange?:(value:string) => void;
    label?:string;
    text?:string;
}

interface IUrlFieldState {
    value?:string;
    valid?:boolean;
    errorMessage?:string;
    errorVisible?:boolean;
}

class UrlField extends React.Component<IUrlFieldProps, IUrlFieldState> {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            valid: false,
            errorMessage: this.props.errorMessage,
            errorVisible: false
        };
    }

    email_pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    handleValidation(value:string, valid:boolean) {
        if (typeof valid === 'undefined') {
            valid = true;
        }
        var message = "";
        var errorVisible = false;
        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        this.setState({
            value: value,
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });
    }

    handleChange(event:any) {
        if (event.target.value) {
            let value = event.target.value;
            let valid = this.isUrl(value);
            if (this.props.onChange && valid) {
                this.updateUrl(value);
                this.setState({
                    value: value,
                    valid: valid,
                    errorVisible: false
                });
            } else {
                this.setState({
                    value: value,
                });
            }
        }
    }

    updateUrl(value:string) {
        let is_email = this.email_pattern.test(value);
        if (is_email) {
            let email_value = 'mailto:' + value;
            this.props.onChange(email_value);
        } else {
            this.props.onChange(value);
        }
    }

    isUrl(value:string) {
        let url_pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        let valid = url_pattern.test(value);
        if (!valid) {
            valid = this.email_pattern.test(value);
        }
        return valid;
    }

    handleBlur(event:any) {
        if (event.target.value) {
            let value = event.target.value;
            let valid = this.isUrl(value);
            this.handleValidation(value, valid);
            if (this.props.onChange && valid) {
                this.updateUrl(value);
            }
        }
    }

    renderErrorMesssage() {
        if (this.state.errorVisible) {
            return (
                <div style={{ color:'#FF0000' }}>
                    { this.state.errorMessage }
                </div>
            )
        }
    }

    render() {
        return (
            <div className="url-field">
                <label>{ this.props.label }</label>
                <input type="text"
                       className="text-edit"
                       placeholder={this.props.text}
                       onChange={this.handleChange.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       value={this.state.value}/>

                { this.renderErrorMesssage() }
            </div>
        );
    }
}

export default UrlField;
