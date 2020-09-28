


import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { CartContext } from '../contexts/CartContext';



const Cart = () => {

    const { cart, addItem, removeItem, amount } = useContext( CartContext );

    return(
        <div>
            <h1 className="ui header center aligned my-brown">Cart</h1>
        
            <table 
                className="ui striped table" 
                style={{ boxShadow: '0 2px 3px rgba(0,0,0, .2)' }}
            >
                <thead>
                    <tr>
                    { cart.length ? 
                        <>
                        <th className="my-brown">Item</th>
                        <th className="my-brown">Description</th>
                        <th className="my-brown">Quantity</th>
                        <th className="my-brown" colSpan="2">Subtotal</th>
                        </>
                        : false 
                    }
                    </tr>
                </thead>
                <tbody>
                    { !cart.length ? 

                            <tr><td colSpan="4" className="my-gold">
                            <h2 style={{ textAlign: 'center' }}>No items added.</h2>
                            </td></tr> 
                            
                        : cart.map( ( item, index ) => { 

                            return(
                                <tr key={ index }>
                                    <td className="my-brown">{ item.name }</td>
                                    <td className="my-gold">{ item.description }</td>

                                    <td className="my-gold" style={{ fontSize: '1.5rem' }}>

                                        <span 
                                            style={{ paddingRight: '10px', fontSize: '2rem' }}
                                            onClick={ () => addItem( item ) }
                                        >
                                            +
                                        </span>

                                        { item.quantity }

                                        <span 
                                            style={{ paddingLeft: '10px', fontSize: '2rem' }}
                                            onClick={ () => removeItem( item ) }
                                        >-</span>

                                    </td>

                                    <td className="my-brown" colSpan="2">${ item.price * item.quantity }</td>
                                </tr>
                            );
                        })
                    }
                </tbody>

                { cart.length ?

                    <tfoot className="full-width">
                    
                    <tr>
                        <th colSpan="5" className="my-brown">Select Pickup Zone:&nbsp;
                            <button className="ui button small primary my-gold-light-bg">
                                Bev Cart
                            </button>&nbsp;
                            <button className="ui button small primary my-gold-light-bg">
                                The Turn
                            </button>&nbsp;
                            <button className="ui button small primary my-gold-light-bg">
                                Main House
                            </button>
                        </th>
                    </tr>

                    <tr>
                        <th colSpan="3"><div className="ui right floated button my-brown">Total:</div></th>

                        <th className="my-brown">
                            ${ amount }
                        </th>
                        <th>
                            <Link to="/payment-form" style={{ width: '100%' }}>
                                <button className="ui button small primary my-gold-light-bg">
                                    Order
                                </button>
                            </Link>
                        </th>
                    </tr></tfoot>

                    : false
                }
            </table>
        </div>
    );

};

export default Cart;