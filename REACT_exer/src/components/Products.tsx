import React from 'react'

const Products = () => {
  const items = [
    {title:'onion', id:1},
    {title:'tomato', id:2},
    {title: 'carrot', id:3},
]
    const listItems = items.map(item => 
    <li key={item.id}>{item.title} {item.id} </li> )
  
    return (
    <div>
        <ul>{listItems}</ul>
    </div>
  )
}

export default Products
