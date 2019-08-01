import React, { Component } from 'react';

export default class StoreCredentialsComponent extends Component {

    constructor(props) {
        super(props);      
        // this.state = {
        //     storeName: '',
        //     storePass: '',
        //     productList: 'salesreceipt',
        //     productListExist: ''
        // };
        this.state = this.props.passState;
        console.log(this.state);       

    
        this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
        this.handleStorePassChange = this.handleStorePassChange.bind(this);        
        this.handleProductListChange = this.handleProductListChange.bind(this); 
        this.handleProductListExistChange = this.handleProductListExistChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToFirstScreen = this.goToFirstScreen.bind(this);
      }
   
      handleStoreNameChange(event) {
        this.setState({storeName: event.target.value});
      }

      handleStorePassChange(event) {
        this.setState({storePass: event.target.value});
      }  
      
      handleProductListChange(event) {
        this.setState({productList: event.target.value});
      }        

      handleProductListExistChange(event) {
        this.setState({productListExist: event.target.value});
      }   

      handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.storeName);
        // alert('A name was submitted: ' + this.state.storePass);
        // alert('A name was submitted: ' + this.state.productList);
        // alert('A name was submitted: ' + this.state.productListExist);
        this.setState((state) => ({
            productList: state.productList,
            productListExist: state.productListExist
          }));        
        this.props.updateParentState(this.state.searchedStore,this.state.selectedStoreIndex,this.state.selectedStoreName,this.state.storeName,this.state.storePass,this.state.productList,this.state.productListExist); 
        this.props.passHandleNext();
        event.preventDefault();
      }

      goToFirstScreen() {
        this.props.updateParentState(this.state.searchedStore,this.state.selectedStoreIndex,this.state.selectedStoreName,this.state.storeName,this.state.storePass,this.state.productList,this.state.productListExist);          
        this.props.passHandleBack();
      }

    render() {
        return (
            <div className="row content-wrapper">
                <div className="col-12">
                </div>
            <div className="col-md-12">
                <h2 className="onboarding-headings mt-3 text-center">Connect Your Sales Channel</h2>
                <h3 className="onboarding-headings text-center">Fill out the box below then click CONNECT for your store</h3>
                <div className="col-md-12">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="col-md-6">
                        <input type="text" placeholder="Enter username for" value={this.state.storeName || ''} onChange={this.handleStoreNameChange}/>
                        </div>

                        <div className="col-md-6">
                        <input type="text" placeholder="Enter password for" value={this.state.storePass || ''} onChange={this.handleStorePassChange}/>
                        </div>

                        <div className="form-group col-md-6">
                            <label>
                                Select product listing:
                                <select value={this.state.productList} onChange={this.handleProductListChange}>
                                    <option value="salesreceipt">Sales Receipt</option>
                                    <option value="invoice">Invoice</option>
                                </select>
                            </label>                            
                        </div>

                        <div className="form-group col-md-6">
                            <label>Are products listed in QB</label>

                                <div className="radio">
                                    <label>
                                        <input type="radio" name="productListExist" value="yes" onChange={this.handleProductListExistChange}/>
                                        Yes
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="productListExist" value="no" onChange={this.handleProductListExistChange} />
                                        No
                                    </label>
                                </div>                           
                        </div>

                        <div className="col-md-12">
                        <button type="button" className="ob-buttons ob-secondary-button" onClick={this.goToFirstScreen}>Back</button>
                        <button className="ob-buttons ob-primary-button" type="submit">Connect</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}