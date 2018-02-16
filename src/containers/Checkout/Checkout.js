import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import ContactData from './ContactData/ContactData' ;
import {connect} from 'react-redux';

class Checkout extends Component{
   
   
   

    checkoutCancelledHandeller= ()=> {
      this.props.history.goBack();
    } 
    
    checkoutConfirmedHandler= ()=>{
      this.props.history.replace('/checkout/contact-data');
      window.location.hash = 'contact';
    }

    render(){

        return(
          <div>
              <CheckoutSummary ingredients={this.props.ings}
              checkoutCancelled= {this.checkoutCancelledHandeller} 
              checkoutConfirmed={this.checkoutConfirmedHandler}
              />
               <div id='contact'></div>
              <Route path ={this.props.match.path + '/contact-data'}
                component={ContactData}/>
          </div>
        );
    };
};

const mapStateToProps =  (state) => {
    return {
        ings: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);