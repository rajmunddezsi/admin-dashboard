import { deleteProduct } from "../../actions";
import SubmitButton from "./SubmitButton";

interface DeleteProductFormProps {
  id: number;
}

export default function DeleteProductForm({ id }: DeleteProductFormProps) {
  const formAction = deleteProduct.bind(null, id);
  
  return (
    <form action={formAction}>
      <SubmitButton label="Delete" />
    </form>
  );
}
