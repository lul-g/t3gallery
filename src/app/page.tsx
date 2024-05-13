import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  console.log(images);
  return (
    <div className="grid grid-cols-4 place-items-center gap-4">
      {images.map((image, index) => (
        <div key={image.id + "-" + index}>
          <img className="rounded-md  border-2 border-white" src={image.url} />
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
