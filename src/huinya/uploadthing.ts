import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers
} from "@uploadthing/react";

import type { OurFileRouter } from "@/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();