


import React, { useContext } from 'react';

import { CartContext } from '../contexts/CartContext';



const Cart = () => {

    const { cart, addItem, removeItem } = useContext( CartContext );

    return(
        <div>
            <h1 className="ui header center aligned my-brown">Cart</h1>
        
            <table 
                className="ui striped table" 
                style={{ boxShadow: '0 2px 3px rgba(0,0,0, .2)' }}
            >
                <thead>
                    <tr>
                    <th className="my-brown">Item</th>
                    <th className="my-brown">Description</th>
                    <th className="my-brown">Quantity</th>
                    <th className="my-brown" colSpan="2">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    { !cart.length 
                        ? <tr><td colSpan="4" className="my-gold">No items added.</td></tr> 
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
                                    <td className="my-brown">${ item.price * item.quantity }</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                <tfoot className="full-width"><tr>
                <th colSpan="3"><div className="ui right floated button my-brown">Total:</div></th>

                <th className="my-brown">
                    ${ cart.reduce( 
                        (acc, curr) => acc + ( curr.price * curr.quantity ), 0 
                    ) }
                </th>

                <th>
                    { cart.length 
                        ? <button className="ui button small primary my-gold-light-bg">
                            Order
                        </button>
                        : false }
                </th>

                </tr></tfoot>
            </table>
        </div>
    );

};

export default Cart;