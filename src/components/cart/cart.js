import React, {Component} from 'react';
import { connect } from 'react-redux';
import AmountBtn from '../amountBtn';
import Trash from '../../static/Trash.svg';
import {removeItem} from '../../actions';

const Cart = ({cart, removeItem}) => {
  const cartItems = cart.map(item => {
    return (
      <div className="cart-item" key={item.id}>
        <div className="cart-item__img">
          <img src={item.img} alt={item.name}/>
        </div>
        <div className="cart-item__name">
          <p>{item.name}</p>
        </div>
        <div className="cart-item__color">
          <p>{item.color}</p>
        </div>
        <div className="cart-item__volume">
          <p>{item.volume} мл</p>
        </div>
        <div className="cart-item__amount">
          <AmountBtn
            amount={item.amount}
            idx={item.id}
            direction='cart'
          />
        </div>
        <div className="cart-item__cost">
          <p>{item.cost} грн</p>
        </div>
        <div className="cart-item__delete" onClick={() => removeItem(item.id)}>
          <img src={Trash} alt="trash"/>
        </div>
      </div>
    )
  })

  return (
    <div className="cart-wrap">
      <h1>Корзина</h1>
      {cartItems}
    </div>
  )
}

const mapStateToProps =  (state) =>{
  return {
      cart: state.cart
  };
};
const mapDispatchToProps = {
  removeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);