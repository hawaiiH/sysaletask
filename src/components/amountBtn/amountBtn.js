import React from 'react';
import {connect} from 'react-redux';
import {incAmount, decAmount} from '../../actions';

const AmountBtn = ({amount, idx, direction, incAmount, decAmount}) => {
  return (
    <div className="amount">
      <span className="amount__minus" onClick={() => decAmount(idx, direction)}>-</span>
      <span className="amount__qtty">{amount}</span>
      <span className="amount__plus" onClick={() => incAmount(idx, direction)}>+</span>
    </div>
  )
}
const mapStateToProps =  () => {
  return {}
};

const mapDispatchToProps = {
  incAmount,
  decAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(AmountBtn);