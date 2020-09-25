


import React, { useContext } from 'react';

import { CartContext } from '../contexts/CartContext';



const Menu = props => {

    const { addItem } = useContext( CartContext );

    return(
        <div>
            <h1 className="ui header center aligned my-brown">{ props.title }</h1>

            <table className="ui striped table" style={{ boxShadow: '0 2px 3px rgba(0,0,0, .2)' }}>
                <thead>
                    <tr>
                    <th className="my-brown">Item</th>
                    <th className="my-brown">Description</th>
                    <th className="my-brown">Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                
                { props.menuData.map( ( item, index ) => {

                    return( 
                        <tr key={ index } onClick={ () => addItem( item ) }>
                            <td className="my-brown">{ item.name }</td>
                            <td className="my-gold">{ item.description }</td>
                            <td className="my-brown">${ item.price }</td>
                            <td>
                                <button className="ui primary button right floated small my-gold-light-bg">
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    );

                }) }

                </tbody>
            </table>
            
        </div>
    );

};

export default Menu;