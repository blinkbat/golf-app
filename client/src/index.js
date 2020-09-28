


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Menu from './components/Menu';
import Cart from './components/Cart';
import App from './components/App';
import PaymentForm from './components/PaymentForm';

import foodData from './dataFood';
import beverageData from './dataBeverage';

import CartContextProvider from './contexts/CartContext';

import './style.scss';



ReactDOM.render( 

    <BrowserRouter>

        <ScrollToTop />

        <App>
            <CartContextProvider>
                <Switch>

                    <Route path="/food" component={ () => <Menu title="Food" menuData={ foodData } /> } exact />
                    <Route path="/beverage" component={ () => <Menu title="Beverage" menuData={ beverageData } /> } exact />
                    <Route path="/cart" component={ Cart } exact />
                    <Route path="/payment-form" component={ PaymentForm } exact />
                    <Route component={ () => <Menu menuData={ foodData } /> } />

                </Switch>
            </CartContextProvider>
        </App>
    </BrowserRouter>, 

    document.querySelector( '#root' )
    
);

