import * as actionTypes  from '../actions/actionTypes';
import {updateObject}  from '../utility';

const INGREDIENTS_PRICES ={
    salad: 15,
    cheese: 25,
    chicken: 60,
    fish: 50
  };

const intialState ={
    ingredients:null,
    totalPrice:20,
    error:false,
    building:false
}

const reducer = (state=intialState, action) => {
   switch(action.type){
       case actionTypes.ADD_INGREDIENT:
       const updatedIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName] + 1};
       const updatedIngredients= updateObject(state.ingredients,updatedIngredient);
       const updatedState ={
           ingredients:updatedIngredients,
           totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
           building:true
          };
        return updateObject(state,updatedState);
           
         
       case actionTypes.REMOVE_INGREDIENT:
       const updatedIngr = { [action.ingredientName]:state.ingredients[action.ingredientName] - 1};
       const updatedIngrs= updateObject(state.ingredients,updatedIngr);
       const updatedStat ={
           ingredients:updatedIngrs,
           totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
           building:true
          };
        return updateObject(state,updatedStat);

         case actionTypes.SET_INGREDIENTS:
           return updateObject(state,{
            ingredients:action.ingredients,
            totalPrice:20,
            error:false,
            building:false
           });
          
          case actionTypes.FETCH_INGREDIENTS_FAILED:
          return updateObject(state,{error:true});
       default:
       return state;
   }
  
} ;

export default reducer;