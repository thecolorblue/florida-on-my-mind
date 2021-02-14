import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { Button, ButtonGroup, Grid, TextField } from '@material-ui/core';

const H2 = styled.h2`
  text-decoration: underline
`;

const UL = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
`;

function nextID(products) {
  if (products.length === 0) return 1;

  return Math.max(...products.map(p => p.id)) + 1;
}

function App() {
  const [ products, setProducts ] = useState([]);
  const [ cart, updateCart] = useState([]);
  const [ newProduct, updateProductForm ] = useState({
    title: '',
    price: 0
  });

  function addToCart(item) {
    const index = cart.map(i => i.id).indexOf(item.id);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1
      });
    }

    updateCart([...cart]);
  }

  function updateNewProduct(event) {
    const target = event.target;
    const value = target.type === 'number' ? parseInt(target.value): target.value;
    const name = target.name;

    updateProductForm({
      ...newProduct,
      [name]: value
    });
  }

  function addProduct(event) {
    event.preventDefault();

    setProducts([
      ...products,
      {
        ...newProduct,
        id: nextID(products)
      }
    ]);

    updateProductForm({
      title: '',
      price: 0
    });
  }

  function removeProduct(product) {
    const index = products.map(p => p.id).indexOf(product.id);
    if (index === -1) {
    return;
    }

    products.splice(index, 1);

    setProducts([...products]);
  }

  function removeFromCart(item) {
    const index = cart.map(i => i.id).indexOf(item.id);
    if (index === -1) {
      return;
    }

    cart.splice(index, 1);

    updateCart([...cart]);
  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item md>
          <H2>Products</H2>
          <UL>
            {products.map((p, i) => (
              <li key={p.id}>
                {p.title} - ${p.price}
                <ButtonGroup>
                  <Button color="primary" onClick={()=>addToCart(p)}>+</Button>
                  <Button color="secondary" onClick={()=>removeProduct(p)}>&#10006;</Button>
                </ButtonGroup>
              </li>
            ))}
          </UL>
          <form onSubmit={addProduct}>
            <TextField label="Title"
              type="text"
              required
              name="title"
              value={newProduct.title}
              onChange={updateNewProduct} />
            <TextField label="Price"
              type="number"
              name="price"
              value={newProduct.number}
              onChange={updateNewProduct} />
            <Button color="primary" type="submit">create</Button>
          </form>
        </Grid>
        <Grid item md>
          <H2>Cart</H2>
          <UL>
          {cart.map((item, i) => (
              <li key={item.id}>
                {item.title} - {item.quantity}
                <Button color="secondary" onClick={()=>removeFromCart(item)}>-</Button>
              </li>
          ))}
          </UL>
          <div>
            Cart Total: ${cart.reduce((total, i) => total + (parseInt(i.price) * i.quantity), 0)}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
