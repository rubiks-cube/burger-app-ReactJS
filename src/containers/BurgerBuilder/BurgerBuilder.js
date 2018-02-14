import React, {Component} from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES ={
  salad: 15,
  cheese: 25,
  chicken: 60,
  fish: 50
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            chicken: 0,
            cheese : 0,
            fish: 0

        },
        totalPrice: 20,
        purchasable: false,
        purchasing: false
    }


    updatePurchaseState(ingredients) {
        

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum>0});
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

 addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice +priceAddition;
    this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
    this.updatePurchaseState(updatedIngredients);


 }


 removeIngredientHandler =(type) => {

    const oldCount = this.state.ingredients[type];
    if(oldCount <=0){
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ingredients:updatedIngredients, totalPrice:newPrice});
    this.updatePurchaseState(updatedIngredients);
 }

 purchaseCancelHandler = () => {
     this.setState({purchasing:false});
 }


 purchaseContinueHandler = () => {
    alert('you continue..');
}

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                 <OrderSummary 
                 price={this.state.totalPrice}
                 purchaseCancel={this.purchaseCancelHandler}
                 purchaseContinue={this.purchaseContinueHandler}
                 ingredients={this.state.ingredients}/> 
            </Modal>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls 
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler} 
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}/>
          </Aux>
        );
    }
}


export default BurgerBuilder;