"use client";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="mb-4 flex w-full items-center justify-between border-b p-4 font-semibold">
      <div className="text-xl text-white">Gallery</div>
      <>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint={"imageUploader"}
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </>
    </nav>
  );
}
