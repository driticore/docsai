"use client";
import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import { uploadToMinIO } from "@/lib/minio"; // Import the upload function
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false); // State for managing uploading status

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string; }) => {
      const response = await axios.post("/api/create-chats", { file_key, file_name });
      return response.data;
    },
  });

  const handleFileUpload = async (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);

    if (uploadedFiles.length === 0) {
      console.error("No files selected.");
      return;
    }

    try {
      setUploading(true);
      const data = await uploadToMinIO(uploadedFiles[0]); // Use the uploaded file instead of files
      if (!data?.file_key || !data?.file_name) {
        console.error("An error occurred.");
        return;
      }
      mutate(data, {
        onSuccess: (data) => {
          console.log("Upload successful:", data);
        },
        onError: (err) => {
          console.error("Upload error:", err);
        },
      });
    } catch (error) {
      console.error("Error uploading file to MinIO:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-transparent dark:bg-black rounded-lg p-4">
      {uploading || isPending ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
          <p className="text-neutral-700 dark:text-neutral-300">Uploading...</p>
        </div>
      ) : (
        <FileUpload onChange={handleFileUpload} />
      )}
    </div>
  );
}
