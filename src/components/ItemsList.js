import React from 'react';
import ItemsItem from "./ItemsItem";

const ItemsList = ({items, title, remove}) => {
  return (
    <div className={'posts-container'}>
      <h2 className={'posts-title'}>{title}</h2>
      <ul className={'posts-list'}>
        {items.map((item, index)=>
          <ItemsItem remove={remove} number={index + 1} item={item} key={item.id}/>
        )}
      </ul>
    </div>
  );
};

export default ItemsList;