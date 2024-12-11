import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const ItemsForm = ({create}) => {

  const [item, setItem] = useState({title: '', body: ''})

  function addItem(event){
    event.preventDefault();
    const new_item ={
      ...item,
      id: Date.now()
    }
    create(new_item);
    setItem({title: '', body: ''})
  }

  return (
    <form  className={'posts-container'}>
      <MyInput
        type="text"
        placeholder="name"
        value={item.title}
        onChange={e=> setItem({...item, title: e.target.value})}
      />
      <MyInput
        type="text"
        placeholder="description"
        value={item.body}
        onChange={e=> setItem({...item, body: e.target.value})}
      />
      <MyButton onClick={addItem}>add</MyButton>
    </form>
  );
};

export default ItemsForm;
