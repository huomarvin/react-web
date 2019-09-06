// 引入createStore创建store，引入applyMiddleware 来使用中间件
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// 引入所有的reducer
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
// 安装redux-devtools-extension的可视化工具。

const initialState = {};

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = () =>
    createStore(
        reducer,
        initialState,
        /* preloadedState, */ composeEnhancers(
            applyMiddleware(thunk)
            // other store enhancers if any
        )
    );

// const configureStore = () => createStore(reducer, composeWithDevTools({}), initialState);

export default configureStore;
