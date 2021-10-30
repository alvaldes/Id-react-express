import * as actionTypes from './actions' 

const initialState = {
    tablaSelected: [],
    isModalOpen: false,
    isModal2Open: false,
}

const reducer = (state=initialState, action) =>{
    switch (action.type) {
      case actionTypes.STORE_TABLE_SELECTED:
        return {
          ...state,
          tablaSelected: action.updateSelected,
        };
        case actionTypes.STORE_Is_Modal_Open:
          return {
            ...state,
            isModalOpen: action.updateModalOpen,
          };
        case actionTypes.STORE_Is_Modal2_Open:
          return {
            ...state,
            isModal2Open: action.updateModal2Open,
          };
          default:
        return state;
    }
}

export default reducer;