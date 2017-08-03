import React from "react";
import { Rootpath } from "../../../includes/Config";
import { ITextImageProps } from "../../../includes/Interfaces";

class ImageHandle extends React.Component<ITextImageProps, {}> {

    handleLinkChange(value) {
        if (value) {
            this.props.componentUpdate(this.props.id, 'link', value);
        }
    }
    
    handleChange(type:string, val:any){
        if(type == 'color' || type == 'background'){
            val = val.hex;
        }else{
            val = val.value;
        }
        this.props.componentUpdate(this.props.id, type, val);
        this.setState({
            [type]: val
        });
    }    

    handleImageUpdate(fileExtracted:string){
        this.props.componentUpdate(this.props.id, 'image', fileExtracted);
        this.setState({
            image: fileExtracted,
        });
    }

    handleImageUpload(imageFile:any) {
        if (imageFile) {
            let imageFormData = new FormData();
            imageFormData.append('imageFile', imageFile);
            var xhr = new XMLHttpRequest();
            var str = window.location.pathname;
            var query = str.split("/");
            var nodeid = parseInt(query[2]);
            var apiURL = window.location.protocol + "//" + window.location.host + '/email_tpl/' + nodeid + '/image_upload';
            xhr.open('post', apiURL, true);
            var handleImageUpdate = this.handleImageUpdate.bind(this);
            xhr.onload = function(xhr){
                let target:any = xhr.target;
                if (target.status == 200) {
                    var fileExtracted = JSON.parse(target.response);
                    handleImageUpdate(fileExtracted);
                } else {
                    console.log(target.statusText);
                }
            }
            xhr.send(imageFormData);
        }
    }

    ImageRemoveHelper(fid:number) {
        if(fid) {
            var imagepath = Rootpath + '/images/img-placeholder.png';
            var apiURL = window.location.protocol + "//" + window.location.host + '/email_tpl/image_remove';
            var data = "fid=" + fid;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", apiURL);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(data);
            var image = {
                path: imagepath,
                fid: 0,
                width: 1128,
                height: 386,
            }
            return image;
        }
    }

    handleImageRemove() {
        const image = this.ImageRemoveHelper(this.props.image.fid);
        if(image) {
            this.props.componentUpdate(this.props.id, 'image', image);
            this.setState({
                image: image,
            });
        }
    }
}

export default ImageHandle;