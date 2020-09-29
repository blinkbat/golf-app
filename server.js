


require( 'dotenv' ).config()

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const crypto = require( 'crypto' );
const squareConnect = require( 'square-connect' );

const app = express();
const PORT = process.env.PORT || 3001;

// Set the Access Token
const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( express.static( __dirname ) );

// Serve up static assets (usually on heroku)
if ( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( 'client/build' ) );
}

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications[ 'oauth2' ];
oauth2.accessToken = ACCESS_TOKEN;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

app.post( '/process-payment', async ( req, res ) => {
    const request_params = req.body;

    // length of idempotency_key should be less than 45
    const idempotency_key = crypto.randomBytes( 22 ).toString( 'hex' );

    // Charge the customer's card
    const payments_api = new squareConnect.PaymentsApi();
    const request_body = {
        source_id: request_params.nonce,
        amount_money: {
            amount: 100, // $1.00 charge
            currency: 'USD'
        },
        idempotency_key: idempotency_key
    };

    try {
        const response = await payments_api.createPayment( request_body );
        res.status( 200 ).json({
            'title': 'Payment Successful',
            'result': response
        });

    } catch( error ) {
        res.status( 500 ).json({
            'title': 'Payment Failure',
            'result': error.response.text
        });
    }
});

app.use( function( req, res ) {
    res.sendFile( path.join( __dirname, "/client/build/index.html" ) );
});

app.listen( PORT, () => console.log( `listening on - http://localhost:${PORT}` ) );
