import React, {Component} from 'react';
import { connect } from 'react-redux';
import AmountBtn from '../amountBtn';
import {toggleCompare, changeColor, changeVolume, submitItem} from '../../actions';
import Compare from '../../static/Compare.svg';
import CompareClick from '../../static/CompareClick.svg';
import Arrow from '../../static/Arrow.svg';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refBox: []
    };
    this.blurBox = this.blurBox.bind(this);
    this.createRef = this.createRef.bind(this);
  }
  blurBox(idx) {
    this.state.refBox[idx].blur();
  }
  createRef(element) {
    this.setState(state => {
      const tmpBox = state.refBox;
      tmpBox.push(element);
      return {
        refBox: tmpBox
      };
    });
  }
  render() {
    const {shopItems, toggleCompare, changeColor, changeVolume, submitItem} = this.props;
    const items = shopItems.map((item, idx)=> {
      return (
        <div className="item" key={item.id}>
          <div className="item__top">
            {item.inStock ? <div className="item__tag"><span>NEW</span></div> : <div className="item__tag"></div>}
            <div className={`item__img img${idx}`}>
              <img src={item.img} alt={item.name}/>
            </div>
            <div className="item__compare" onClick={() => toggleCompare(idx)}>
              <img src={item.toCompare ? CompareClick : Compare} style={item.toCompare ? {margin: "19px"} : null} alt="compare"/>
            </div>
          </div>
          <div className="item__name">
            <h1>{item.name}</h1>
          </div>
          <div className="item__description">
            <p>{item.description}</p>
          </div>
          <div className="item__select-and-price">
            <div className="item__select-box select-box" onMouseLeave={() => this.blurBox(idx)}>
              <div className="select-box__current" tabIndex={idx+1} ref={this.createRef}>
                <div className="select-box__value">
                  <input className="select-box__input" type="radio" name={`select-box${idx}`} defaultChecked="checked" />
                  <p className="select-box__input-text">Цвет</p>
                </div>
                {item.colors.map( (color, i) => {
                  return (
                    <div className="select-box__value" key={i}>
                      <input
                        className="select-box__input"
                        type="radio" id={`${color}${idx}`}
                        value={color}
                        name={`select-box${idx}`}
                        onChange={(e) => changeColor(idx, color)}
                      />
                      <p className="select-box__input-text">{color}</p>
                    </div>
                  )
                })}
                <img className="select-box__icon" src={Arrow} alt="Arrow Icon" aria-hidden="true" />
              </div>
              <ul className="select-box__list">
                {item.colors.map( (color, i) => {
                  return (
                    <li key={i}><label className="select-box__option" htmlFor={`${color}${idx}`} aria-hidden="true">{color}</label></li>
                  )
                })}
              </ul>
            </div>
            <div className="item__price">
              {item.price} грн
            </div>
          </div>
          <div className="item__select-volumes">
            {item.volumes.map( (volume, i) => {
              return (
                <div className="volume" key={i}>
                  <input
                    className="volume__input"
                    type="radio" id={`${i}${item.id}`}
                    value={volume}
                    name={`volume${item.id}`}
                    onChange={() => changeVolume(idx, volume)}
                    checked={volume === item.volume}
                  />
                  <label className="volume__label"htmlFor={`${i}${item.id}`}>{volume} мл</label>
                </div>
              )
            })}
          </div>
          <div className="item__amount ">
            <AmountBtn
              amount={item.amount}
              idx={idx}
              direction='shopItems'
            />
          </div>
          <div className="item__button">
            <button className="button-gradient" onClick={() => submitItem(idx)}>Купить</button>
          </div>
        </div>
      )
    })
  return items
  }
}

const mapStateToProps =  (state) =>{
  return {
      shopItems: state.shopItems,
  };
};

const mapDispatchToProps = {
  toggleCompare,
  changeColor,
  changeVolume,
  submitItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);