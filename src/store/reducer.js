import * as actionTypes  from './actions';

const INGREDIENTS_PRICES ={
    salad: 15,
    cheese: 25,
    chicken: 60,
    fish: 50
  };

const intialState ={
    ingredients: {
        salad:0,
        cheese:0,
        chicken:0,
        fish:0
    },
    totalPrice:20
}

const reducer = (state=intialState, action) => {
   switch(action.type){
       case actionTypes.ADD_INGREDIENT:
         return{
           ...state,
           ingredients:{
               ...state.ingredients,
               [action.ingredientName]:state.ingredients[action.ingredientName] + 1
           },
           totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
         };
       case actionTypes.DELETE_INGREDIENT:
         return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName] - 1
            },
            totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
         };
       default:
       return state;
   }
  
} ;

export default reducer;