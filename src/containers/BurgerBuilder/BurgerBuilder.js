import React, {Component} from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES ={
  salad: 15,
  cheese: 25,
  chicken: 60,
  fish: 50
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading:false,
        error: false
    }
   
    componentDidMount(){
        
        axios.get('https://burger-app-3393.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients:res.data});
        })
        .catch(err=>{
           this.setState({error:true});
        });
        
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
    
    const queryParams =[];
    for (let i  in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+ '='+encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
        pathname:'/checkout',
        search: '?'+ queryString
    });
}

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSummary =null;

        

        let burger = this.state.error?<p> ingredients can't be fetched!!</p>:  (<Aux><br/> <Spinner /></Aux>);

       if(this.state.ingredients){
          burger = (
        <Aux>
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
         orderSummary =  <OrderSummary 
         price={this.state.totalPrice}
         purchaseCancel={this.purchaseCancelHandler}
         purchaseContinue={this.purchaseContinueHandler}
         ingredients={this.state.ingredients}/> ;

        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
              {burger}
          </Aux>
        );
    }
}


export default withErrorHandler(BurgerBuilder,axios);