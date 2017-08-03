interface IFocusHandler {
  inputFocused: boolean;
  editorMouseDown: boolean;
  editorFocused: boolean;
  onEditorMouseDown?:() => void;
  onInputMouseDown?:() => void;
  isEditorBlur?:(event:any) => boolean;
  isEditorFocused?:() => boolean;
  isToolbarFocused?:() => boolean;
  isInputFocused?:() => boolean;
}

export default class FocusHandler implements IFocusHandler{

  inputFocused = false;
  editorMouseDown = false;
  editorFocused = false;

  constructor() {
    this.editorFocused = false;
  }

  onEditorMouseDown = () => {
    this.editorFocused = true;
  }

  onInputMouseDown = () => {
    this.inputFocused = true;
  }

  isEditorBlur = (event) => {
    if (event.target.tagName === 'INPUT' && !this.editorFocused) {
      this.inputFocused = false;
      return true;
    } else if (event.target.tagName !== 'INPUT' && !this.inputFocused) {
      this.editorFocused = false;
      return true;
    }
    return false;
  }

  isEditorFocused = () => {
    if (!this.inputFocused) {
      return true;
    }
    this.inputFocused = false;
    return false;
  }

  isToolbarFocused = () => {
    if (!this.editorFocused) {
      return true;
    }
    this.editorFocused = false;
    return false;
  }

  isInputFocused = () => this.inputFocused;
}