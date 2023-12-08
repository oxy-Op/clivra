"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
// import "@uploadthing/react/styles.css";

interface UploadFileProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "imageFile";
  type: "avatar" | "message";
}

export const UploadFile = ({
  onChange,
  value,
  endpoint,
  type,
}: UploadFileProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div
        className={cn(
          "relative",
          type === "avatar"
            ? "rounded-full h-20 w-20"
            : "w-80 h-60 rounded-none"
        )}
      >
        <Image
          fill
          sizes={type === "avatar" ? "72px" : "320px"}
          src={value}
          alt="upload"
          className={cn(
            "object-cover",
            type === "avatar" ? "rounded-full" : ""
          )}
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center mt-2 p-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noreferrer noopener"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};
