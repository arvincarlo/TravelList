import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

export default App;