import { createProduct } from "../../actions";

export default function ProductForm() {
  return (
    <form action={createProduct}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description"></textarea>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" name="category" type="text" />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" />
      </div>

      <button type="submit">Create product</button>
    </form>
  );
}
