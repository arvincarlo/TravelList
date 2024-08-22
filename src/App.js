import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargers", quantity: 3, packed: true },
  { id: 4, description: "Powebank", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackingList/>
      {/* {initialItems.map(item => <PackingList key={item.id} item={item}/>) } */}
      <Stats/>
    </div>
  )
}

function Logo() {
  return <h1>🛫 Da Nang - Hoi An - Hue 🚞</h1>
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || description.length <= 2) return;
    
    const newItem = {
      description, quantity, packed: false, id: Date.now()
    };

    console.table(newItem);
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => <Item key={item.id} item={item}/>)}
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

function Item({item}) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button>⚡</button>
    </li>
  )
}

export default App;