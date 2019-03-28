import React              from 'react';
import ReactDOM           from 'react-dom';
import * as serviceWorker from 'src/serviceWorker';
import Index              from 'src/containers/App';
import './index.scss';


ReactDOM.render( <Index />, document.getElementById('root') );
serviceWorker.unregister(); // serviceWorker.register();
