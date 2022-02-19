import React, { useState } from "react";

export function Upload({ children }) {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };
  return (
    <>
      <h1>Upload Json file - Example</h1>

      <input type="file" onChange={handleChange} />
      <br />
      {"uploaded file content -- " + files}
    </>
  );
}
