import React from 'react';
import ItemList from '../itemsList';
import Cart from '../cart';

import './styles.scss';

const App = () => {
  return (
    <>
      <div className="main">
        <div className="item-list">
          <ItemList />
        </div>
        <div className="cart-block">
          <Cart />
        </div>
      </div>
    </>
  )
}
export default App;