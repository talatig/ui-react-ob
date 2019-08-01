import React, { Component } from 'react';
import SelectStoreComponent from "../../pages/onboarding/selectstore.component";
import StoreCredentialsComponent from "../../pages/onboarding/storecredentials.component";
import StoreSuccessComponent from "../../pages/onboarding/storesuccess.component";
import axios from 'axios';

function getStepContent(step,handleNext,handleBack,state,updateParentState) {
    switch (step) {
      case 0:
        return <SelectStoreComponent passHandleNext={handleNext} passState={state} updateParentState={updateParentState}/>;
      case 1:
        return <StoreCredentialsComponent passHandleBack={handleBack} passHandleNext={handleNext} passState={state} updateParentState={updateParentState}/>;
      case 2:
        return <StoreSuccessComponent passHandleBack={handleBack} passState={state} updateParentState={updateParentState}/>;
      default:
        return 'Unknown step';
    }
}

export default class StepperChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchedStore: '',  
          selectedStoreIndex: '',
          selectedStoreName: '',
          storeName: '',
          storePass: '',
          productList: 'salesreceipt',
          productListExist: ''          
        };
        console.log(this.state);    
        this.updateParentState = this.updateParentState.bind(this);  
    }

    componentDidMount() {
      console.log('component mount stepper');
      axios.get(`http://localhost:4000/obdatas`)
      .then(res => {
        const data = res.data[0];
        if(data) {
          this.setState({
            onboardingRecordID: data._id,
            searchedStore: data.searchedStore,  
            selectedStoreIndex: data.selectedStoreIndex,
            selectedStoreName: data.selectedStoreName,
            storeName: data.storeName,
            storePass: data.storePass,
            productList: data.productList,
            productListExist: data.productListExist
          })
        } else {
          console.log('inside else');
          axios.post(`http://localhost:4000/obdatas/add`, this.state)
          .then(res => {
            console.log(res);
            console.log(res.data);
            axios.get(`http://localhost:4000/obdatas`)
            .then(res => {
              console.log(res);
              console.log(res.data[0]._id);
              this.setState({
                onboardingRecordID: res.data[0]._id
              })              
            })                
          })          
        }
        console.log(this.state);
      })
    }


    updateParentState(searchedStore, selectedStoreIndex, selectedStoreName, storeName, storePass, productList, productListExist) {
      this.setState({
        searchedStore: searchedStore,  
        selectedStoreIndex: selectedStoreIndex,
        selectedStoreName: selectedStoreName,
        storeName: storeName,
        storePass: storePass,
        productList: productList,
        productListExist: productListExist
      }, () => {
        axios.post(`http://localhost:4000/obdatas/update/${this.state.onboardingRecordID}`, this.state)
        .then(res => {
          console.log(res);
          console.log(res.data);            
        })  
      });      
    }

    render() {
        return (
            <div>
            { this.state && this.state.onboardingRecordID && <div>             
                {getStepContent(this.props.passActiveStep,this.props.passHandleNext,this.props.passHandleBack,this.state, this.updateParentState)}
                </div>
            }
            </div>
        )
    }
}