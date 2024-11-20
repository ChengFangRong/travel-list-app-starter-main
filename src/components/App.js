import React, {useState} from "react";


// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({handleAddItem}) {



  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  



  function handleSubmit(e) {
    e.preventDefault();
    setDescription(e.target.value);

    const newItem = {                       // idk :C
      id: Date.now(),
      description,
      quantity,
      packed: false
    };

    handleAddItem(newItem);
    return (setDescription(""), setQuantity(1));
  };


  function handleQuantity(e) {
    e.preventDefault();
    setQuantity(e.target.value)
  };




  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} id="quantity" onChange={(e) => setQuantity(Number(e.target.value))}>

        <option value="1"> 1 </option>

        <option value="2"> 2 </option>

        <option value="3"> 3 </option>

      </select>

      <input 
        type="text" 
        placeholder="Item..." 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        >

      </input>

      <button id="submit">Add</button>

    </form>
  );
}

function Item({description, quantity, packed}) {

  if (packed == true) {
    return (<li style = {{textDecoration: "line-through"}}>{description}({quantity})</li>)
  } else {
    return (<li>{description}({quantity})</li>);
  };


}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {

  const [items, setItems] = useState([])


  function handleAddItem(item) {
    setItems((prev) => {
      return [item, ...prev];
    });
  };


  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem}/>
      <PackingList items={items}/>
      <Stats />
    </div>
  );
}

export default App;
