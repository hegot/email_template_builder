import React from "react";
import ImageUpload from './ImageUpload';

interface IImageWidget{
    handleImageRemove:()=> void;
    handleImageUpload:()=> void;
    path: string;
    fid: number;
}

class ImageWidget extends React.Component<IImageWidget, {}> {

    handleImageRemove(){
        this.props.handleImageRemove();
    }

    render() {
        if (this.props.fid != 0) {
            return (
                <table className="image_preview_container">
                    <tbody>
                    <tr>
                        <td>
                            <img className="img-thumb"
                                 src={ this.props.path }/>
                        </td>
                        <td>
                            <button className="img-remove"
                                    onClick={ this.handleImageRemove.bind(this) }>
                                Remove Image
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        } else {
            return (
                <ImageUpload handleImageUpload={ this.props.handleImageUpload } />
            );
        }
    }
}

export default ImageWidget;