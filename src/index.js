import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'src/utils/registerServiceWorker';
import './index.scss'
// --
import AppDummy from 'src/components/AppDummy';

ReactDOM.render( <AppDummy />, document.getElementById('root') );
// --
// import App from 'src/components/App';

// ReactDOM.render( <App />, document.getElementById('root') );
// --
registerServiceWorker();
