export default function Stats({ items }) {
  const totalItems = items.length;
  const totalPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((totalPacked / totalItems) * 100);

  // const totalPacked = items.reduce((total, item) => item.packed + total, 0);
  // const totalPacked = items.reduce((total, item) => item.packed + total, 0)
  // console.log(typeof(totalItems, totalPacked));
  if (!items.length) {
    return (
      <footer className="stats">
        <em>🚀 Start by adding some items on your packing list 📝</em>
      </footer>
    );
  }

  return (
    <footer className="stats">
      {(percentage !== 100) ?
        <em> 💼 You have {totalItems} items on your list, and you already packed {totalPacked} {totalItems ? `(${percentage}%)` : ''}.</em>
        : <em>🛫 Ingaaaat!!! You got everything and you are ready to go! 🚗</em>}
    </footer>
  );
}
