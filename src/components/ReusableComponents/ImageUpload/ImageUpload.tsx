import React from "react";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IImageUploadProps{
    handleImageUpload:(blob:any) => void;
}

interface IImageUploadState{
    file: string,
    imagePreviewUrl: string,
    blob: boolean,
}

class ImageUpload extends React.Component<IImageUploadProps, IImageUploadState>  {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            blob: false,
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    handleImageUpload(blob){
        this.props.handleImageUpload(blob);
    }


    _handleSubmit(e) {
        e.preventDefault();
        var handleImageUpload = this.handleImageUpload.bind(this);
        let cropper:any =  this.refs.cropper;
        cropper.getCroppedCanvas().toBlob(function (blob) {
            if(blob){
                handleImageUpload(blob);
            }
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<Cropper ref='cropper'
                                      src={ imagePreviewUrl }
                                      style={{height: 200, width: '100%'}}
                                      guides={false}
                                       />);
        }

        return (
            <table className="image_upload">
                <tbody>
                <tr>
                    <td>
                        {$imagePreview}
                    </td>
                </tr>
                <tr>
                    <td>
                        <form className="image_upload_form"
                              onSubmit={this._handleSubmit}>
                            <input className="manage-file" type="file"
                                   onChange={this._handleImageChange}/>
                            <button type="submit" onClick={this._handleSubmit}>
                                Upload Image
                            </button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export default ImageUpload;