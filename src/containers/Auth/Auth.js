import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state={
        controls: {
            email: {
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Email Id'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }

        },
        isSignUp:true
    };


    componentDidMount(){
        if(!this.props.burgerBuilded && !this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirect();
        }
    }

    checkValidity(value,rules){
        let isValid = true;
        
        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }
       
        if(rules.minLength){
            isValid= value.length >= rules.minLength  && isValid;
        }
        
        if(rules.isEmail){
            var re = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
            
            isValid=  re.test(String(value).toLowerCase()) && isValid;
        }
      
        return isValid;
      }

    inputChangeHandler = (event , controlName) =>{

        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }

    submitHandler = (event) => {
       event.preventDefault();
       this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    
    switchAuthModeHandler =()=> {
        this.setState(prevState=>{
          return {isSignUp:!prevState.isSignUp}
        })
    }

    render(){

        const formElementsArray=[];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config:this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            shouldValidate ={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            />
        ));
        if(this.props.loading){
            
            form=  (<div><br/><Spinner/></div>);
        }

        let errMsg = null;
        if(this.props.error){
            errMsg=<small style={{color:'red'}}>{this.props.error.message}</small>
        }
        
        let authRedirect=null;

        if(this.props.isAuthenticated){
           // console.log(this.props.authRedirectPath);
              authRedirect=<Redirect to ={this.props.authRedirectPath}/>;
        }

        return (
           <div className={classes.Auth}>
               {authRedirect}
                {errMsg}
               <form onSubmit={this.submitHandler}>
               {this.state.isSignUp? <span style={{color:'salmon'}}>SIGN UP</span>:<span style={{color:'salmon'}}>SIGN IN</span>}
                   {form}
               <Button btnType="Success" > SUBMIT </Button>
               </form>
               <Button clicked={this.switchAuthModeHandler} btnType="Danger" > SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'} </Button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return{
       loading:state.auth.loading,
       error:state.auth.error,
       isAuthenticated: state.auth.token !== null,
       burgerBuilded: state.burgerBuilder.building,
       authRedirectPath :state.auth.authRedirect
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);