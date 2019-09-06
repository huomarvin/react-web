import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from './redux/store/configureStore';
import Router from './router';

const store = configureStore();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
