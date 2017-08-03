import React from "react";

interface IControlsProps {
    historyPrev:()=> void;
    historyNext:()=> void;
    refs:any;
    handleSave:()=> void;
    saved:boolean;
}

function renderConfirmation(saved:boolean) {
    if (saved) {
        return (
            <div className="confirmation">
                Template successfully saved!
            </div>
        )
    }
}

class Controls extends React.Component<IControlsProps, {}> {
    render() {
        const {historyPrev, historyNext, refs, handleSave, saved} = this.props;
        return (
            <div className="col-md-12 tpl-column-wide">
                <div className="clearfix">
                    <div className="pull-right">
                        <button className="btn undo"
                                onClick={historyPrev}/>
                        <button className="btn redo"
                                onClick={historyNext}/>
                        <button id="preview-template"
                                className="btn btn-md btn-default" onClick={() => {
                                        refs.simpleDialog.show();
                                    }
                                    }>Preview
                        </button>
                        <button className="btn btn-md btn-default tpl-save"
                                onClick={handleSave}> Save Template
                        </button>
                    </div>
                </div>
                { renderConfirmation(saved) }
            </div>
        );
    }
}

export default Controls;