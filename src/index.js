import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'src/serviceWorker';
import App from 'src/components/App';
import './index.scss';


ReactDOM.render( <App />, document.getElementById('root') );
serviceWorker.unregister(); // serviceWorker.register();
