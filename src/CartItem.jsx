import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => (state.cart && state.cart.items) ? state.cart.items : []);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      const price = parseFloat(String(item.cost).replace(/[^0-9.-]+/g, '')) || 0;
      const qty = Number(item.quantity) || 0;
      totalCost += price * qty;
    });

    return totalCost.toFixed(2);
  };
  const totalCost = calculateTotalAmount();

  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onContinueShopping && onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    const name = item.name;
    const newQty = (Number(item.quantity) || 0) + 1;
    dispatch(updateQuantity({ name, quantity: newQty }));
  };

  const handleDecrement = (item) => {
    const name = item.name;
    const currentQty = Number(item.quantity) || 0;
    if (currentQty > 1) {
      dispatch(updateQuantity({ name, quantity: currentQty - 1 }));
    } else {
      // remove the item if quantity would go below 1
      dispatch(removeItem(name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const price = parseFloat(String(item.cost).replace(/[^0-9.-]+/g, '')) || 0;
    const quantity = Number(item.quantity) || 0;
    return Number((price * quantity).toFixed(2));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalCost}</h2>
      <div>
        {cart.length === 0 ? (
          <div style={{ color: 'black' }}>Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>

            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;