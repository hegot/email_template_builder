var script:any = document.currentScript;

export var Rootpath:any = script.src.replace('dist/bundle.js', '');

export var Mentions = [
    {
        text: 'firstname',
        value: 'firstname',
        url: 'firstname',
    },
    {
        text: 'lastname',
        value: 'lastname',
        url: 'lastname',
    },
    {
        text: 'company',
        value: 'company',
        url: 'company',
    },
    {
        text: 'email',
        value: 'email',
        url: 'email',
    }
];

export var Toolbar:{
    options:['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
    inline:{
        options:['bold', 'italic', 'underline'],
    },
    list:{
        options:['unordered', 'ordered'],
    }
}

var Drupal:any;
var ComponentsExtracted:any;
if (typeof Drupal !== 'undefined') {
    ComponentsExtracted = JSON.parse(Drupal.settings.lp_emarketing.template_obj);
    if (ComponentsExtracted.length <= 0) {
        ComponentsExtracted = [];
    }
} else {
    ComponentsExtracted = [];
}
export var Components = ComponentsExtracted;