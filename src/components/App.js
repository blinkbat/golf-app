


import React from 'react';

import Nav from './Nav';


const App = props => {

    return(
        <div>
            <Nav />

            <div className="ui container" style={{ margin: '70px 0 70px 0' }}>

            { props.children }

            </div>
        
        </div>
    );

};

export default App;