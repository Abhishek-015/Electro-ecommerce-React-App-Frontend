import React from "react";

const FileUplaod = () => {
  const handleFileUploadAndResize = (e) => {
    console.log(e.target.files)
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-sm">Choose File
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
