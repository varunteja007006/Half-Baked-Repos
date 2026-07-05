"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Basic() {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("dropped aah?");
      setUploadedFiles(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border size-72 pointer bg-white/20 border-dashed p-5"
    >
      <input {...getInputProps()} />
      <p>Drag and drop files here or click to browse.</p>
      <ul>
        {uploadedFiles.map((file: any) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Basic;
