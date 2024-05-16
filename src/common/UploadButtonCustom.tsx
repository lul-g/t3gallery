"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { PostHog } from "posthog-js";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

function UploadSVG() {
  return (
    <div className="pr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
        />
      </svg>
    </div>
  );
}

const LoadingSpinner = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <rect className="spinner_zWVm" x="1" y="1" width="7.33" height="7.33" />
      <rect
        className="spinner_gfyD"
        x="8.33"
        y="1"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_T5JJ"
        x="1"
        y="8.33"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_E3Wz"
        x="15.66"
        y="1"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_g2vs"
        x="8.33"
        y="8.33"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_ctYB"
        x="1"
        y="15.66"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_BDNj"
        x="15.66"
        y="8.33"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_rCw3"
        x="8.33"
        y="15.66"
        width="7.33"
        height="7.33"
      />
      <rect
        className="spinner_Rszm"
        x="15.66"
        y="15.66"
        width="7.33"
        height="7.33"
      />
    </svg>
  );
};

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function CustomUploadButton() {
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin(fileName) {
      toast(
        <div className="flex items-center gap-2">
          <LoadingSpinner /> Uploading . . .
        </div>,
        {
          duration: 100000,
          id: "upload-begin",
        },
      );
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("😎 Upload Complete 🎉");
      router.refresh();
    },
    onUploadError() {
      toast.dismiss("upload-begin");
      toast("😥 Oh no! Upload Failed❗");
      router.refresh();
    },
  });
  const router = useRouter();
  const posthog = usePostHog();

  posthog.capture("upload_begin");
  return (
    <>
      <label htmlFor="upload" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input id="upload" type="file" className="sr-only" {...inputProps} />
    </>
  );
}
