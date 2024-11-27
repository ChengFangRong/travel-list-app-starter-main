import React, {useState} from "react";


const bannedItems = [ "water bottle" , "knife", "batteries", "battery","medicine", "sparklers", "alcohol"]

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({handleAddItem}) {



  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  



  function handleSubmit(e) {



    e.preventDefault();

    const bannedItem = bannedItems.find((i) => i === description);

    if (bannedItem){
      alert("This item is banned");
      return;
    }


    else {
      setDescription(e.target.value);

      const newItem = {                       // idk :C
        id: Date.now(),
        description,
        quantity,
        packed: false
      };

      handleAddItem(newItem);
      return (setDescription(""), setQuantity(1));
    }
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

  if (packed === true) {
    return (<li style = {{textDecoration: "line-through"}}>{description}({quantity})</li>)
  } 
  if (packed === false) {
    return (<li>{description}({quantity})</li>);
  };

}

function PackingList({ items , handleDeleteItem , handleUpdateItem}) {


  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li>
          <input type='checkbox' checked={item.packed} onChange={() => handleUpdateItem(item.id)}></input>
          <Item
            key={item.id}
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
          />
          
          <button onClick={() => handleDeleteItem(item.id)}>&#128025;</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) {

  let length = items.length;
  let packed = items.filter((item) => item.packed === true).length;
  let total = (packed/length) * 100;

  if (length !== packed) {
    return (
    <footer className="stats">
      <em>You have {length} items in the list. You already packed {packed} ({total.toFixed(2)} %).</em>
    </footer>
    );
  } else {
    return (
      <footer className="stats">
        <em>You got everything!</em>
      </footer>
  );
}


}

function App() {

  const [items, setItems] = useState([])


  function handleAddItem(item) {
    setItems((prev) => {
      return [item, ...prev];
    });
  };


  function handleDeleteItem(itemId) {
    setItems((prev) => 
      prev.filter((item) => item.id !== itemId)
    );
  };

  function handleUpdateItem(itemId) {
    setItems((prev) => 
      prev.map((item) => item.id === itemId ? {...item, packed: !item.packed} : item) // !item.pack --> it toggles between true and false instead of setting vale to true only when clicked
      
    )
  };


  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem}/>
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;
