export interface IComponentProps {
    id:number;
    active?:boolean;
    background?:string;
    color?:string;
    font_size?:string;
    font_weight?:string;
    width?:string;
    height?:string;
    padding?:string;
    text_align?:string;
    preview?:boolean;
    componentUpdate?:(id:number, type:string, val:any) => void;
}

export interface IEditableTextblockProps extends IComponentProps {
    raw1state?:string;
    raw2state?:string;
    doublecolumns:boolean;
    html1?:string;
    html2?:string;
}

export interface IEditableDividerProps extends IComponentProps {
    border_style?:string;
    border_width?:string;
    border_color?:string;
}

export interface IEditableButtonProps extends IEditableDividerProps {
    link?:string;
    text?:string;
}

export interface IEditableSocialShareProps extends IComponentProps {
    icon_style?:string;
    icon_color?:string;
    components?:[{type:string, text:string, url:string}];
}

export interface IEditableVideoProps extends IComponentProps {
    video:string;
    videotype:string;
    videourl:string;
    preview_src:string;
    html:string;
    rawstate?:string;
    preview_width?:string;
}

export interface IImageProps extends IComponentProps {
    image:{
        path:string;
        fid:number;
        width:number;
        height:number;
    }
    link?:string;
}

export interface ITextImageProps extends IImageProps {
    imagecolumn?:number;
    imagewidth:number;
    imagepadding:string;
    html?:string;
    rawstate?:string;
}

export interface IEditableContentProps extends IComponentProps {
    html:string;
    selectedTitle:string;
    selectedOption:string;
    options:[ISelectOption];
    text_align:string;
    read_more?:string;
}

export interface IComponent {
    component:string;
    props:IComponentProps;
    handleClose?:() => void;
}

export interface IEmailTemplateState {
    components?:[ IComponent ];
    active_editor?:number;
    saved?:boolean;
    history_index?:number,
    raw_tpl_html?:string,
    sorting?:boolean;
}

export interface ISortableComponents {
    components:[ IComponent ];
    addComponent:(id:string, index:number)  => void;
    itemsSorting:(oldIndex:number, newIndex:number)  => void;
    active_editor:number;
    handleClose:() => void;
    componentUpdate?:() => void;
    componentEditHandler?:(index:number) => void;
    handleDelete?:(index:number) => void;
}

export interface IEditorTab {
    id?:number,
    label?:string,
    content?:any,
}

export interface ISelectOption {
    value:string|boolean|number,
    label:string
}