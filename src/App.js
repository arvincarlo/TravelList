import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    alert(id);
    setItems(items => items.filter(item => item.id !== id));
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem}/>
      {/* {initialItems.map(item => <PackingList key={item.id} item={item}/>) } */}
      <Stats/>
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

function PackingList({items, onDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {items.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem}/>)}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em> 💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  )
}

function Item({item, onDeleteItem}) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={(e) => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

export default App;