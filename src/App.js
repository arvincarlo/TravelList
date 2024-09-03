import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id !== id ? item : {...item, packed: !item.packed}));
  }

  function handleClearList() {
    const confirmed = window.confirm('Are you sure you want to clear the list?');
    if (confirmed) setItems([]);
  }
  
  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggleItem={handleToggleItem} 
        onClearList={handleClearList}
      />
      {/* {initialItems.map(item => <PackingList key={item.id} item={item}/>) } */}
      <Stats items={items}/>
    </div>
  )
}

function Logo() {
  return <h1>🏰 Da Nang - Hue - Hoi An 🚞</h1>
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || description.length <= 2) return;
    
    const newItem = {
      description, quantity, packed: false, id: Date.now()
    };

    onAddItems(newItem);
    resetState();
  }

  function resetState() {
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🧳 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => <option key={num} value={num}>{num}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => {setDescription(e.target.value)}}/>
      <button className="btn">ADD</button>
    </form>
  )
}

function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
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
        {sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>)}
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
function Stats({items}) {
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
    )
  }

  return (
    <footer className="stats">
      {(percentage !== 100) ?
        <em> 💼 You have {totalItems} items on your list, and you already packed {totalPacked} {totalItems ? `(${percentage}%)` : ''}.</em>
      : <em>🛫 Ingaaaat!!! You got everything and you are ready to go! 🚗</em>}
    </footer>
  )
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={(e) => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

export default App;