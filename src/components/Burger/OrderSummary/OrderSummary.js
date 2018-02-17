import React, {Component} from 'react';
import Aux from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {


componentWillUpdate(){
   // console.log('[order summary ]  will update..')
}

render(){
    const summary = Object.keys(this.props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: 
        &nbsp; {this.props.ingredients[igKey]}</li>
    });
 return (
   <Aux>
       <h3>Your Order </h3>
       <p> Your delicious burger with following ingredients:</p>
       <ul>
           {summary}
        </ul>
        <p><strong>Total Price:  ​&#8377; {this.props.price} </strong></p>
        <p> Continue to checkout? </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}> CANCEL </Button>
        <Button  btnType="Success" clicked={this.props.purchaseContinue}> CONTINUE </Button>
   </Aux>
 );
};
};

export default OrderSummary;