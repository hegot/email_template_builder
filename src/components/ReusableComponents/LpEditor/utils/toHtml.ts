import { convertToHTML } from 'draft-convert';

interface IBlockResponse {
    nestStart?:string;
    nestEnd?:string;
    start?:string;
    end?:string;
}

const styleAttr = (styles) => {
    return styles.length ? ' style="' + styles.join(" ") + '"' : "";
};

const typeTagMap = {
    "blockquote"          : "blockquote",
    "unordered-list-item" : "ul",
    "ordered-list-item"   : "ol",
    "header-one"          : "h1",
    "header-two"          : "h2",
    "header-three"        : "h3",
    "header-four"         : "h4",
    "header-five"         : "h5",
    "header-six"          : "h6",
    "default"             : "p",
    "unstyled"            : "div"
};

const createBlockResponse = (type, styles) => {
    const tag = typeTagMap[type] || typeTagMap["default"];

    let response:IBlockResponse = {
        start : '<' + tag + styleAttr(styles) + '>',
        end   : '</' + tag + '>'
    };
    if (type === "unordered-list-item" || type === "ordered-list-item") {
        response = {
            nestStart : '<' + tag +  ' style="text-align:left;">',
            nestEnd   : '</' + tag + '>',
            start     : '<li>',
            end       : '</li>'
        };
    }

    return response;
};

export default function (editorState) {
    return convertToHTML({
        styleToHTML  : (style) => {
        },
        blockToHTML  : (block) => {
            let styles = [];
            if (block.data) {
                if (block.data["text-align"]) {
                    styles.push("text-align:" + block.data["text-align"] + ";");
                }
                if (block.data.blockAlignment) {
                    styles.push("block-align-" + block.data.blockAlignment);
                }
                if (block.data.zoom) {
                    styles.push("block-zoom-" + block.data.zoom);
                }
            }

            return createBlockResponse(block.type, styles);
        },
        entityToHTML : (entity, originalText) => {
            switch (entity.type) {
                case 'LINK':
                    return `<a href="${entity.data.url}" target="${entity.data.target}">${originalText}</a>`;

                case 'MENTION':
                    const  url:string = entity.data.url;

                    if (url) return `<a class="mention" href="${url}">${originalText}</a>`;

                    return `<span class="mention">${originalText}</span>`;

                default :
                    return originalText
            }
        }
    })(editorState.getCurrentContent());
}