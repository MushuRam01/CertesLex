"use client";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result?.toString().split(",")[1];

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64File }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`File uploaded! File ID: ${data.fileId}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
      setUploading(false);
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload to Google Docs"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
