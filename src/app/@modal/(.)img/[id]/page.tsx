import { getImage } from "~/server/queries";
import { Modal } from "./modal";

export default async function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const idAsNum = Number(id);
  if (Number.isNaN(idAsNum)) throw new Error("Invalid Photo Id");
  const image = await getImage(idAsNum);
  return (
    <Modal>
      <img src={image.url} alt={image.name} className="w-96" />
    </Modal>
  );
}
