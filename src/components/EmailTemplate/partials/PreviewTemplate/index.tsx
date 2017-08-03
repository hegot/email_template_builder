import React from "react";

interface IPreviewTemplateState {
    width:string;
}

class PreviewTemplate extends React.Component<{}, IPreviewTemplateState> {
    constructor(props) {
        super(props);
        let state:IPreviewTemplateState = {
            width: '800px',
        };
        this.state = state;
    }

    handleChange(width:string) {
        this.setState({
            width: width,
        });
    }

    render() {
        var styling = {
            width: this.state.width,
            margin: '0 auto',
        }
        return (
            <div className="preview_tpl">
                <div className="raw_tpl_controls">
                    <div className="preview_option">
                        <input type="radio"
                               onClick={this.handleChange.bind(this, 800)}
                               name="width" value="800"/> Desktop
                    </div>
                    <div className="preview_option">
                        <input type="radio"
                               onClick={this.handleChange.bind(this, 468)}
                               name="width" value="468"/> Tablet
                    </div>
                    <div className="preview_option">
                        <input type="radio"
                               onClick={this.handleChange.bind(this, 320)}
                               name="width" value="320"/> Mobile
                    </div>
                </div>
                <div className="raw_tpl_wrap">
                    <div id="raw_tpl" style={ styling }>
                    </div>
                </div>
            </div>
        );
    }
}


export default PreviewTemplate;