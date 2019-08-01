import React, { Component } from 'react';
import jsonData from "../../../assets/data/http/store-list.json";

export default class SelectStoreComponent extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.passState;
        this.state.storesList = jsonData.storesList;
        console.log(this.state.storesList);
        this.handleSearchedStoreChange = this.handleSearchedStoreChange.bind(this);
        console.log(this.state);      
    }

    displayCredentialScreen(item,index) {
        console.log(this.state.onboardingRecordID);
        this.setState((state) => ({
            selectedStoreIndex: state.storesList.indexOf(item),
            selectedStoreName: item.storeName
          }));
        // this.selectedStoreIndex = this.storeArr.indexOf(item);
        setTimeout(() => {
            console.log(this.state);
            this.props.updateParentState(this.state.searchedStore,this.state.selectedStoreIndex,this.state.selectedStoreName,this.state.storeName,this.state.storePass,this.state.productList,this.state.productListExist);     
            this.props.passHandleNext();
        }, 200);
    }

    handleSearchedStoreChange(event) {
        this.setState({searchedStore: event.target.value});
    }

    render() {
        const { storesList } = this.state;
        const { searchedStore } = this.state;
        var filteredStoreList = storesList.filter(function (item) {
            return item.storeName.toLowerCase().includes(searchedStore.toLowerCase());
        });
        return (
            <div className="row content-wrapper">
                <div className="col-12">                    
                </div>
                <div className="col-12 text-center">
                    <div className="stores-container">
                        <h2 className="onboarding-headings mt-3">Select Your channel</h2>
                        <input type="text" placeholder="Search Sales Channel" value={this.state.searchedStore} onChange={this.handleSearchedStoreChange}/>
                        <div className="row">

                            {filteredStoreList.map((item,index) => (
                                <div className="col-md-3 col-sm-12 mt-3 mb-3 store-list-container" onClick={(e) => this.displayCredentialScreen(item, index, e)} key={index}>
                                    {item.storeName}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}