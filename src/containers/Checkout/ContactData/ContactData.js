import React, {Component} from 'react' ;
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';


class ContactData extends Component{

state = {
    orderForm: {
        
            name: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
             street: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
             city: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'City'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
             PIN: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'PIN'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
             email: {
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    email: true
                },
                valid:false,
                touched:false
            },
             mobile: {
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Mobile No.'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:10,
                    maxLength:10,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
             deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest', displayValue:'Fastest'},
                       {value:'cheapest', displayValue:'Cheapest'}
                       
                   ]
                },
                value:'fastest',
                validation: {},
                valid:true
                
            }
    },
    formIsValid:false,
    loading:false
};


  checkValidity(value,rules){
    let isValid = true;
    
    if(rules.required){
        isValid= value.trim() !== '' && isValid;
    }
   
    if(rules.minLength){
        isValid= value.length >= rules.minLength  && isValid;
    }
    if(rules.maxLength){
        
        isValid=  value.length <= rules.maxLength && isValid;
    }
    if(rules.isNumber){
        
        var reg = new RegExp('^[0-9]+$');
        isValid= reg.test(value) && isValid;
        
    }
    if(rules.email){
        var re = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
        
        isValid=  re.test(String(value).toLowerCase()) && isValid;
    }
  
    return isValid;
  }

  inputChangeHandler = (event,inputIdentifier) =>{
    const updatedForm = {
        ...this.state.orderForm
    }
    const updatedFormElement = {...updatedForm[inputIdentifier]};
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    updatedFormElement.touched=true;
    updatedForm[inputIdentifier]=updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifier in updatedForm){
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    
    this.setState({orderForm:updatedForm,formIsValid:formIsValid});
  }

  orderHandler = (event) => {
     
    event.preventDefault();

    this.setState({loading:true});
   const formData={};
   for (let key in this.state.orderForm){
       formData[key]=this.state.orderForm[key].value;
   } 

    const order = {
        ingredients: this.props.ings,
        price: this.props.price,
       orderData:formData
    };
    axios.post('/orders.json',order)
    .then(response => {
        this.setState({loading:false});
        this.props.history.push('/');
    })
    .catch(error => {
        this.setState({loading:false});
    });
  }
    render(){
    
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config:this.state.orderForm[key]
            });
        }

    let form =(
        <form onSubmit={this.orderHandler}>
       
        {formElementsArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            shouldValidate ={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            />

        ))}
        
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER </Button>
        </form>
       );
     if(this.state.loading){
              form = <Spinner/>;
          }
        return (
           <div className={classes.ContactData}>
               <h4> Enter your Delivery Details </h4>
              {form}
            </div>
        );
    }

}

const mapStateToProps =  (state) => {
    return {
        ings: state.ingredients,
        price:state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);