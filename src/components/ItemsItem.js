import React from 'react';
import MyButton from "./UI/button/MyButton";

const ItemsItem = ({item, number, remove}) => {
  return (
    <li className={'post-item'}>
      <div style={{display: 'flex'}}>
        <div className={'post-item-id'}>
          <p>{number}</p>
        </div>
        <div className={'post-item-content'}>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
        </div>
      </div>
      <div>
        <MyButton onClick={()=> remove(item)}>remove</MyButton>
      </div>
    </li>
  );
};

export default ItemsItem;
