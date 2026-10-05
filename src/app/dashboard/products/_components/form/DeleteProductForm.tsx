import { deleteProduct } from "../../actions";
import SubmitButton from "./SubmitButton";

interface DeleteProductFormProps {
  id: number;
}

export default function DeleteProductForm({ id }: DeleteProductFormProps) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton label="Delete" />
    </form>
  );
}
