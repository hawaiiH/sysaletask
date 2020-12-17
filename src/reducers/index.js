import img1 from '../static/1st.jpg';
import img2 from '../static/2nd.jpg';
import img3 from '../static/3rd.jpg';

const initialState = {
  shopItems: [
    {
      id: 0,
      img: img1,
      name: 'Шампунь',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      colors: ['Желтый', 'Красный', 'Зеленый', 'Белый', 'Синий', 'Фиолетовый'],
      price: 200,
      volumes: [100, 200, 300],
      inStock: true,
      toCompare: false,
      amount: 1,
      color: '',
      volume: 100,
      cost: 0
    },
    {
      id: 1,
      img: img2,
      name: 'Шампунь',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      colors: ['Желтый', 'Красный', 'Зеленый'],
      price: 200,
      volumes: [100, 200, 300],
      inStock: true,
      toCompare: false,
      amount: 1,
      color: '',
      volume: 100,
      cost: 0
    },
    {
      id: 2,
      img: img3,
      name: 'Шампунь',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      colors: ['Желтый', 'Красный', 'Зеленый'],
      price: 200,
      volumes: [100, 200, 300],
      inStock: true,
      toCompare: false,
      amount: 1,
      color: '',
      volume: 100,
      cost: 0
    }
  ],
  cart: [],
  idCart: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_COMPARE':
      const compItem = state.shopItems[action.id];
      const newCompItem = {
        ...compItem,
        toCompare: !compItem.toCompare
      };
      return {
        ...state,
        shopItems: [
          ...state.shopItems.slice(0, action.id),
          newCompItem,
          ...state.shopItems.slice(action.id + 1)
        ]
      };
    case 'CHANGE_COLOR':
      const colItem = state.shopItems[action.id];
      const newColItem = {
        ...colItem,
        color: action.payload
      };
      return {
        ...state,
        shopItems: [
          ...state.shopItems.slice(0, action.id),
          newColItem,
          ...state.shopItems.slice(action.id + 1)
        ]
      };
    case 'CHANGE_VOLUME':
      const volItem = state.shopItems[action.id];
      const newVolItem = {
        ...volItem,
        volume: action.payload
      };
      return {
        ...state,
        shopItems: [
          ...state.shopItems.slice(0, action.id),
          newVolItem,
          ...state.shopItems.slice(action.id + 1)
        ]
      };
    case 'INC_AMOUNT':
      console.log(action.payload);
      const incInd = state[action.payload].findIndex(item => item.id === action.id);
      console.log(action.id, incInd);
      const incItem = state[action.payload][incInd];
      const costInc = incItem.price*(incItem.amount + 1)*(incItem.volume/100);
      const newIncItem = {
        ...incItem,
        amount: ++incItem.amount,
        cost: costInc
      };
      return {
        ...state,
        [action.payload]: [
          ...state[action.payload].slice(0, incInd),
          newIncItem,
          ...state[action.payload].slice(incInd + 1)
        ]
      };
    case 'DEC_AMOUNT':
      const decInd = state[action.payload].findIndex(item => item.id === action.id);
      const decItem = state[action.payload][decInd]; 
      if (decItem.amount > 1) {
        const costDec = decItem.price*(decItem.amount - 1)*(decItem.volume/100);
        const newDecItem = {
          ...decItem,
          amount: --decItem.amount,
          cost: costDec
        };
        return {
          ...state,
          [action.payload]: [
            ...state[action.payload].slice(0, decInd),
            newDecItem,
            ...state[action.payload].slice(decInd + 1)
          ]
        };
      } else {
        return state;
      }
    case 'SUBMIT_ITEM':
      const submitItem = state.shopItems[action.id];
      const costSub = submitItem.price*submitItem.amount*(submitItem.volume/100); 
      if (submitItem.color) {
        const newCartItem = {
          id: state.idCart,
          img: submitItem.img,
          name: submitItem.name,
          amount: submitItem.amount,
          color: submitItem.color,
          volume: submitItem.volume,
          price: submitItem.price,
          cost: costSub
        };
        return {
          ...state,
          cart: [
            ...state.cart,
            newCartItem
          ],
          idCart: ++state.idCart
        };
      } else {
        return state;
      }
    case 'REMOVE_ITEM':
      const removeInd = state.cart.findIndex(item => item.id === action.id);
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, removeInd),
          ...state.cart.slice(removeInd + 1)
        ]
      };
    default:
      return state;
  }
};

export default reducer;