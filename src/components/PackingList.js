import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  // Sorting by the input order
  if (sortBy === 'input') sortedItems = items;

  // Sorting based in the item description
  if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  // if (sortBy === 'description') sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  // if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  // Sorting based on the packed status
  if (sortBy === 'packed') sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));


  console.log(sortedItems);

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
      </ul>
      <div className="actions">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>CLEAR LIST</button>
      </div>
    </div>
  );
}
