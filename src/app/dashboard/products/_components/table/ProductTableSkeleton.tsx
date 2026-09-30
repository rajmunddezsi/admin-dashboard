export default function ProductTableSkeleton() {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5].map((placeholder) => (
          <tr key={placeholder}>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
