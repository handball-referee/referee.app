import u from 'updeep';

const initialState = {
  order: 'asc',
  orderBy: 'id',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SORT': {
      let { orderBy, order } = state;
      if (action.payload === orderBy) {
        order = order === 'asc' ? 'desc' : 'asc';
      } else {
        orderBy = action.payload;
        order = 'asc';
      }
      return u({
        orderBy,
        order,
      }, state);
    }
    default:
      return state;
  }
};

export default reducer;
