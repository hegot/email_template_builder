import React from "react";
import {DefaultComponents} from "./DefaultComponents";
import {
    convertFromHTML,
    ContentState,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';
import {
    IEmailTemplateState,
    IComponent,
    ISelectOption
} from "./Interfaces";
import update from 'react-addons-update';

export function arrayMove(arr:any, previousIndex:number, newIndex:number):[IComponent] {
    var array:[IComponent] = (<any>arr).slice(0);
    if (newIndex >= (<any>array).length) {
        var k = newIndex - (<any>array).length;
        while (k-- + 1) {
            (<any>array).push(undefined);
        }
    }
    (<any>array).splice(newIndex, 0, (<any>array).splice(previousIndex, 1)[0]);
    array = (<any>array).filter(function (n) {
        return n != undefined
    });
    return array;
}


export function generateOptions(ending:string, multiplier:number, limit:number):[ISelectOption] {
    var result:any = [];
    var i;
    for (i = 1; i < limit; i++) {
        let number_value:number = i * multiplier;
        let numberString:string = <any>number_value;
        let finalvalue = numberString + ending;
        result.push({value: finalvalue, label: finalvalue});
    }
    return result;
}

export function historyPrevHelper(history, state):IEmailTemplateState {
    var new_state:IEmailTemplateState = {};
    if (history.length > 1) {
        var index = state.history_index;
        if (index == 0) {
            var count = history.length;
            index = count - 2;
        } else {
            index = index - 1;
        }
        if (history[index]) {
            new_state = state;
            new_state.components = JSON.parse(history[index]);
            new_state.history_index = index;
        }
    }
    return new_state;
}

export function historyNextHelper(history, state):IEmailTemplateState {
    var new_state:IEmailTemplateState = {};
    if (history.length > 1) {
        var index = state.history_index;
        var count = history.length;
        if (index <= count) {
            index = index + 1;
            if (history[index]) {
                new_state = state;
                new_state.components = JSON.parse(history[index]);
                new_state.history_index = index;
            }
        }
    }
    return new_state;
}

export function getEditorState(value:string) {
    if (value) {
        let contentState = convertFromRaw(JSON.parse(value));
        var editorState = EditorState.createWithContent(contentState);
    }
    else {
        var editorState = EditorState.createEmpty();
    }
    return editorState;
}

export function handleDeleteHelper(state:IEmailTemplateState, id:number):IEmailTemplateState {
    var components = state.components;
    (<any>components).splice(id, 1);
    state.components = components;
    state.active_editor = -1;
    return state;
}

export function componentUpdateHelper(state:IEmailTemplateState, component_id:string, prop_name:string, prop_value:any):IEmailTemplateState {
    state.components.map((item, index) => {
        var key = parseInt(component_id);
        if (index == key) {
            state.components[key].props[prop_name] = prop_value;
            state.history_index = 0;
        }
    });
    return state;
}

export function componentEditHandlerHelper(state, component_id) {
    state.components.map((item, index) => {
        state.components[index].props.active = false;
    });
    let newState = update(state, {
        components: {
            [component_id]: {
                props: {
                    active: {
                        $set: true
                    }
                }
            }
        },
        active_editor: {
            $set: component_id
        }
    });

    return newState;
}

export function handleSaveHelper(state:IEmailTemplateState):IEmailTemplateState {
    state.components.map((item, index) => {
        state.components[index].props.active = false;
    })
    var str = window.location.pathname;
    var query = str.split("/");
    var nodeid = parseInt(query[2]);
    var apiURL = window.location.protocol + "//" + window.location.host + '/email_tpl/' + nodeid + '/save';
    var data = "json_data=" + JSON.stringify(state.components);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", apiURL);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    setTimeout(function () {
        let raw_tpl_html:any = state.raw_tpl_html;
        var html_data = "html=" + raw_tpl_html.innerHTML;
        var html_xmlhttp = new XMLHttpRequest();
        html_xmlhttp.open("POST", apiURL);
        html_xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        html_xmlhttp.send(html_data);
    }, 400);
    state.saved = true;
    state.active_editor = -1;
    return state;
}

export function addComponentHelper(state:IEmailTemplateState, id:string, index:number):IEmailTemplateState {
    state.components.map((item, ind) => {
        state.components[ind].props.active = false;
    });
    var newComponent = DefaultComponents[id];
    var new_key = state.components.length + 1;
    newComponent.props.id = new_key;
    newComponent.props.active = true;
    state.components.splice(index, 0, newComponent);
    let newState = update(state, {
        active_editor: {
            $set: index
        },
        sorting: {
            $set: false
        }
    });
    return newState;
}




