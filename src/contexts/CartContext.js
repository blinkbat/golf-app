


import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();



toast.configure();

const CartContextProvider = props => {

    const [ cart, setCart ] = useState( [] );



    const addItem = item => { 

        toast.info( `${ item.name } added to cart!`, { position: 'bottom-left' } );

        const itemExists = cart.find( cartItem => item.id === cartItem.id );

        if( itemExists ) {

            itemExists.quantity++;

            const newCart = cart.map( cartItem => Object.assign( {}, cartItem ) );

            setCart( newCart );

        } else { 
        
            const newItem = Object.assign( {}, item );

            const newCart = [ newItem, ...cart ];
        
            setCart( newCart );
        
        }

        console.log( cart );
    };

    const removeItem = item => { 

        toast.error( `${ item.name } removed from cart.`, { position: 'bottom-left' } );
        
        item.quantity--;

        const cartQuantity = cart.filter( cartItem => cartItem.quantity );
        
        setCart( cartQuantity );

        console.log( cart );

    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem }}>
            { props.children }            
        </CartContext.Provider>  
    );

}



export default CartContextProvider;