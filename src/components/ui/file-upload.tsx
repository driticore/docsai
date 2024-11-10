import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { uploadToMinIO } from "@/lib/minio";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({ onChange }: { onChange?: (files: File[]) => void; }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFile(newFiles[0]);
    onChange && onChange([newFiles[0]]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string; }) => {
      const response = await axios.post("/api/create-chats", { file_key, file_name });
      return response.data;
    },
  });

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/pptx": [".pptx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "text/plain": [".txt"],
    },
    noClick: true,
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB. Please use a smaller file.");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToMinIO(uploadedFile);
        if (!data?.file_key || !data?.file_name) {
          toast.error("An error occurred.");
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
        toast.error("Failed to upload file. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((file) => {
        toast.error(`File ${file.file.name} rejected: ${file.errors[0].message}`);
      });
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-5 group/fil flex rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        {uploading || isPending ? (
          <><Loader2 className="w-10 h-10 text-blue-900 animate-spin"/><p>Uploading...</p></>
        ) : (
          <>
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
              className="hidden"
            />
            <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
              <GridPattern />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                Upload file
              </p>
              <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                Drag or drop your file here or click to upload
              </p>
              <div className="relative w-full mt-10 max-w-xl mx-auto">
                {file ? (
                  <motion.div
                    key={file.name}
                    layoutId={"file-upload-"}
                    className={cn("relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md")}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>
                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                      >
                        {file.type}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modified {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className={cn("relative group-hover/file:shadow-2xl z-40 bg-primary dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md", "shadow-[0px_10px_10px_rgba(0,0,0,0.1)]")}
                  >
                    {isDragActive ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-neutral-600 flex flex-col items-center"
                      >
                        Drop it
                        <IconUpload className="h-4 w-4 text-primary-foreground dark:text-primary-foreground" />
                      </motion.p>
                    ) : (
                      <IconUpload className="h-4 w-4 text-primary-foreground dark:text-neutral-300" />
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0 ? "bg-gray-50 dark:bg-neutral-950" : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
