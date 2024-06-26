import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  console.log(images);
  return (
    <div className="grid grid-cols-4 place-items-center gap-4">
      {images.map((image, index) => (
        <div key={image.id + "-" + index}>
          <Link href={`/img/${image.id}`}>
            <Image
              width={400}
              height={400}
              style={{ objectFit: "contain" }}
              alt={image.name}
              className="rounded-md  border-2 border-white"
              src={image.url}
            />
          </Link>
          <span className="text-white">{image.name}</span>
        </div>
      ))}
    </div>
  );
}
export default function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="text-center">Please Sign In To See Your Images 😁</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
