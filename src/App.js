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
  
  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
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

function PackingList({items, onDeleteItem, onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>)}
      </ul>
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