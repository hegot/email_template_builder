import {Rootpath} from "./Config";
export var DefaultComponents = {

    EditableTextblock: {
        component: "EditableTextblock",
        props: {
            id: 0,
            active: true,
            background: "#FFFFFF",
            color: "#222222",
            raw1state: '{"entityMap":{},"blocks":[{"key":"ek3ni","text":"This is a text block. You can use it to add text to your template.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            raw2state: '{"entityMap":{},"blocks":[{"key":"ek3ni","text":"Edit text for cloumn 2.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            doublecolumns: false,
            font_size: "12px",
            font_weight: "600",
            width: "100%",
            padding: "25px",
            text_align: "center",
            html1: '<p>This is a text block. You can use it to add text to your template.</p>',
            html2: '<p>Edit text for cloumn 2.</p>',
        }
    },

    EditableButton: {
        component: "EditableButton",
        props: {
            id: 0,
            active: true,
            background: "#73D8FF",
            color: "#333333",
            text: "Button text",
            font_size: "12px",
            font_weight: "600",
            width: "100px",
            padding: "5px",
            link: '',
            border_style: 'solid',
            border_width: '1px',
            border_color: '#333333',
            text_align: "center",
        }
    },

    EditableDivider: {
        component: "EditableDivider",
        props: {
            id: 0,
            active: true,
            border_style: 'solid',
            border_width: '2px',
            border_color: '#0062B1',
            width: "90%",
            padding: "10px",
        }
    },

    EditableFooter: {
        component: "EditableFooter",
        props: {
            id: 0,
            active: true,
            background: "#FFFFFF",
            color: "#222222",
            raw1state: '{"entityMap":{"0":{"type":"MENTION","mutability":"IMMUTABLE","data":{"text":"@company","value":"company","url":"company"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"@updatePreferences","target":"_self"}},"2":{"type":"LINK","mutability":"MUTABLE","data":{"url":"@unsubscribe","target":"_self"}}},"blocks":[{"key":"ek3ni","text":"Copyright © @currentYear @company , All rights reserved.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":56,"style":"ITALIC"}],"entityRanges":[{"offset":25,"length":9,"key":0}],"data":{"text-align":"center"}},{"key":"bnpff","text":"Our mailing address is: ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"bl67f","text":"@mailingAddress","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"270q0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"center"}},{"key":"794p3","text":"Want to change how you receive these emails? ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":45,"style":"fontsize-14"}],"entityRanges":[],"data":{"text-align":"center"}},{"key":"d722b","text":"You can update   your preferences or unsubscribe  from this list. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":65,"style":"fontsize-14"}],"entityRanges":[{"offset":8,"length":6,"key":1},{"offset":37,"length":11,"key":2}],"data":{"text-align":"center"}}]}',
            raw2state: '{"entityMap":{},"blocks":[{"key":"ek3ni","text":"Edit text for cloumn 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            doublecolumns: false,
            font_size: "16px",
            font_weight: "500",
            width: "100%",
            padding: "25px",
            text_align: "center",
            html1: '<div style=\"text-align:center;\"><em>Copyright © @currentYear <span class=\"mention\">@company </span>, All rights reserved.</em></div><div style=\"text-align:center;\"><strong>Our mailing address is:</strong> </div><div style=\"text-align:center;\">@mailingAddress</div><div style=\"text-align:center;\"></div><div style=\"text-align:center;\">Want to change how you receive these emails? </div><div style=\"text-align:center;\">You can <a href=\"@updatePreferences\" target=\"_self\">update</a>   your preferences or <a href=\"@unsubscribe\" target=\"_self\">unsubscribe</a>  from this list. </div>',
            html2: '<p>Edit text for cloumn 2.</p>',
        }
    },

    EditableSocialShare: {
        component: "EditableSocialShare",
        props: {
            id: 0,
            active: true,
            width: "50%",
            padding: "15px",
            float: "left",
            align: "left",
            background: "",
            color: "#222222",
            font_size: "12px",
            font_weight: "600",
            icon_color: 'color',
            icon_style: 'solid',
            components: [
                {
                    type: 'facebook',
                    text: 'Share',
                    url: '',
                },
                {
                    type: 'twitter',
                    text: 'Tweet',
                    url: '',
                },
                {
                    type: 'linkedin',
                    text: 'Share',
                    url: '',
                },
                {
                    type: 'pinterest',
                    text: 'Pin',
                    url: '',
                },
                {
                    type: 'googleplus',
                    text: '+1',
                    url: '',
                },
            ]
        }
    },

    EditableVideo: {
        component: "EditableVideo",
        props: {
            id: 0,
            active: true,
            background: "#FFFFFF",
            color: "#222222",
            rawstate: '{"entityMap":{},"blocks":[{"key":"ek3ni","text":"Enter Video URL in the Editor. Set up caption text here","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            html: '<p>Enter Video URL in the Editor. Set up caption text here</p>',
            video: "",
            font_size: "12px",
            font_weight: "600",
            width: "100%",
            padding: "15px",
            text_align: "center",
            videotype: "",
            preview_src: "",
            preview_width: "auto",
        }
    },

    EditableImage: {
        component: "EditableImage",
        props: {
            id: 0,
            active: true,
            height: "150px",
            width: "70%",
            padding: "10px",
            text_align: "center",
            link: '',
            image: {
                path: Rootpath + '/images/img-placeholder.png',
                fid: 0,
                width: 1128,
                height: 386,
            }
        }
    },

    EditableTextImage: {
        component: "EditableTextImage",
        props: {
            id: 0,
            active: true,
            height: "150px",
            width: "70%",
            padding: "15px",
            background: "#FFFFFF",
            color: "#222222",
            doublecolumns: false,
            rawstate: '{"entityMap":{},"blocks":[{"key":"ek3ni","text":"This is a text block. You can use it to add text to your template.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
            font_size: "12px",
            font_weight: "600",
            text_align: "center",
            html: '<p>This is a text block. You can use it to add text to your template.</p>',
            imagecolumn: 1,
            link: "",
            imagewidth: 50,
            imagepadding: "15px",
            image: {
                path: Rootpath + '/images/img-placeholder.png',
                fid: 0,
                width: 1128,
                height: 386,
            }
        }
    },

    EditableContent: {
        component: "EditableContent",
        props: {
            id: 0,
            active: true,
            background: "#FFFFFF",
            color: "#222222",
            font_size: "16px",
            font_weight: "500",
            width: "100%",
            padding: "10px",
            text_align: "center",
            html: '<div>Select Content that should be displayed here</div>',
            selectedOption: '',
            selectedTitle: 0,
            options: '',
            read_more: 'Read More...',
        }

    },
}

