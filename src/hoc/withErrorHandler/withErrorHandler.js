import React ,{Component} from 'react';
import Aux from '../Auxi/Auxi';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedContent,axios) => {
  

   return class extends Component {

      state = {
        error: null
      };

     componentWillMount (){
        

      this.reqInterceptor =  axios.interceptors.request.use(req=>{
            this.setState({error:null});
            return req;
         });
       this.resInterceptor = axios.interceptors.response.use(res=>res, error=>{
            
           this.setState({error:error});
        });
       };

       componentWillUnmount (){
          
           axios.interceptors.request.eject(this.reqInterceptor);
           
           axios.interceptors.response.eject(this.resInterceptor);
       }

       errorConfirmhandler = () => {
        this.setState({error:null});
       };

    render(){
        return(
            <Aux>
                <Modal show={this.state.error} modalClose={this.errorConfirmhandler}>
                       {this.state.error?this.state.error.message:null}
                 </Modal>
                <WrappedContent {...this.props} />
                </Aux>

        );
    }
}
}

export default withErrorHandler;