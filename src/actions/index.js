const toggleCompare = (id) => {
  return {
    type: 'TOGGLE_COMPARE',
    id: id
  };
};
const changeColor = (id, color) => {
  return {
    type: 'CHANGE_COLOR',
    id: id,
    payload: color
  };
};
const changeVolume = (id, volume) => {
  return {
    type: 'CHANGE_VOLUME',
    id: id,
    payload: volume
  };
};
const incAmount = (id, direction) => {
  return {
    type: 'INC_AMOUNT',
    id: id,
    payload: direction
  };
};
const decAmount = (id, direction) => {
  return {
    type: 'DEC_AMOUNT',
    id: id,
    payload: direction
  };
};
const submitItem = (id) => {
  return {
    type: 'SUBMIT_ITEM',
    id: id
  };
};
const removeItem = (id) => {
  return {
    type: 'REMOVE_ITEM',
    id: id
  }
}
export {
  toggleCompare,
  changeColor,
  changeVolume,
  incAmount,
  decAmount,
  submitItem,
  removeItem
};