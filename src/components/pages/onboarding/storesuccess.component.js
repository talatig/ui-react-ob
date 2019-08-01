import React, { Component } from 'react';

export default class StoreSuccessComponent extends Component {

    constructor(props) {
        super(props);      
        this.state = this.props.passState;
        console.log(this.state);     
      }

    render() {
        return (
            <div className="row content-wrapper store-success-wrapper">
                <div className="col-md-12">
                    <div className="store-success-info col-md-4 float-left">
                        <label>username : {this.state.storeName}</label><br />
                        <label>password : {this.state.storePass}</label><br />
                        <label>Are products listed : {this.state.productList}</label><br />
                        <label>Selected product listing : {this.state.productListExist}</label><br />
                    </div>
                    <div className="col-md-8 float-left text-center">
                        <h3 className="onboarding-headings"><span>Congrats!</span><br />You've successfully connected your store to
                            Webgility</h3>
                        <button className="ob-buttons ob-secondary-button" onClick={this.props.passHandleBack}>Back</button>
                        <button className="ob-buttons ob-primary-button">Check your sales</button>
                    </div>
                </div>
            </div>
        )
    }
}