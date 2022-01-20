import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUplaod = ({values,setValues,setLoading}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleFileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
        setLoading(true)
      for (let file of files) {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image:uri},{
                headers:{
                    authtoken:user?user.token:""
                }
            })
            .then(res => {
                console.log('image response data --->',res.data)
                setLoading(false)
                allUploadedFiles.push(res.data);
                setValues({...values,images:allUploadedFiles})
            })
            .catch(err=>{
                setLoading(false)
                console.log('CLOUDINARY UPLOAD ERROR',err)
            })
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-sm">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={handleFileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUplaod;
