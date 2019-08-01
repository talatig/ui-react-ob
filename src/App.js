import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectStoreComponent from "./components/pages/onboarding/selectstore.component";
import StoreCredentialsComponent from "./components/pages/onboarding/storecredentials.component";
import StoreSuccessComponent from "./components/pages/onboarding/storesuccess.component";
import StepperComponent from "./components/common/stepper/stepper.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={StepperComponent} />
      </div>
  </Router>
  );
}

export default App;
