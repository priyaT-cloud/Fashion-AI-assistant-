import React, { useState } from 'react';

function PhotoUploader({ label, onUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (event) => setFile(event.target.files[0]);
  const handleUpload = () => {
    if (!file) return alert("Please select a file.");
    onUpload(file);
  };

  return (
    <div>
      <label>{label}</label><br />
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {file && <p>{file.name}</p>}
    </div>
  );
}
export default PhotoUploader;
