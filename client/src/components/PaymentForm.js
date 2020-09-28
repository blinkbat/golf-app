


import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../contexts/CartContext';

import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
} from 'react-square-payment-form'
  
import 'react-square-payment-form/lib/default.css'



const PaymentForm = () => {

    const { amount } = useContext( CartContext );

    const [ errorMessages, setErrorMessages ] = useState( [] );

    const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
        if (errors) {
            setErrorMessages( errors.map( error => error.message ) );
            return;
        }

        setErrorMessages( [] );

        fetch( 'process-payment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nonce: nonce
            })
        })
        .catch( err => {

            alert( 'Network error: ' + err );
        })
        .then( response => {

            if ( !response.ok ) {
                return response.json().then( errorInfo => Promise.reject( errorInfo ) ); //UPDATE HERE
            }

            return response.json(); //UPDATE HERE
        })
        .then( data => {
            console.log(data); //UPDATE HERE
            alert( 'Payment complete successfully!\nCheck browser developer console for more details' );
        })

        .catch( err => {
            console.error(err);
            alert( 'Payment failed to complete!\nCheck browser developer console for more details' );
        });
    };

    const createVerificationDetails = () => {
        return {
            amount: amount + '.00 USD',
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {
                familyName: "Smith",
                givenName: "John",
                email: "jsmith@example.com",
                country: "GB",
                city: "London",
                addressLines: ["1235 Emperor's Gate"],
                postalCode: "SW7 4JA",
                phone: "020 7946 0532"
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '5px', 
                boxShadow: '0 2px 3px rgba(0,0,0, .2)'
            }}>
                <h1 className="my-brown">Payment</h1>

                <SquarePaymentForm
                    sandbox={true}
                    applicationId="sandbox-sq0idb-PY8eOtjnqi3wCf9iLUSfvg"
                    locationId="L3T2TT16D2Q2C"
                    cardNonceResponseReceived={ cardNonceResponseReceived }
                    createVerificationDetails={ createVerificationDetails }
                >

                    <fieldset className="sq-fieldset">
                        <CreditCardNumberInput />
                        <div className="sq-form-third">
                        <CreditCardExpirationDateInput />
                        </div>

                        <div className="sq-form-third">
                        <CreditCardPostalCodeInput />
                        </div>

                        <div className="sq-form-third">
                        <CreditCardCVVInput />
                        </div>
                    </fieldset>

                    <CreditCardSubmitButton>
                        Pay ${ amount }
                    </CreditCardSubmitButton>
                    
                </SquarePaymentForm>

                <div className="sq-error-message">
                    { errorMessages.map( errorMessage =>
                        <li key={`sq-error-${ errorMessage }`}>{ errorMessage }</li>
                    ) }
                </div>

                <Link to="/cart">
                    <h4 style={{ textAlign: 'center' }}>Back to Cart &rarr;</h4>
                </Link>

            </div>
        </div>
    );
    
}

export default PaymentForm;