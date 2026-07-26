type HasId = { id: string | number };

export default function List<T extends HasId>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>...</li>
      ))}
    </ul>
  );
}
