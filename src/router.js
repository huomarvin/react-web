import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './Admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import NoMatch from './pages/nomatch';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import NotMatch from './pages/nomatch';
import Role from './pages/role';
import User from './pages/user';
import Resource from './pages/resource';

export default class ERouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route
                            path="/"
                            render={() => (
                                <Admin>
                                    <Switch>
                                        <Route path="/home" component={Home} />
                                        <Route path="/ui/buttons" component={Buttons} />
                                        <Route path="/ui/modals" component={Modals} />
                                        <Route path="/ui/loadings" component={Loadings} />
                                        <Route path="/ui/notification" component={Notice} />
                                        <Route path="/ui/messages" component={Messages} />
                                        <Route path="/ui/tabs" component={Tabs} />
                                        <Route path="/role" component={Role} />
                                        <Route path="/user" component={User} />
                                        <Route path="/resource" component={Resource} />
                                        <Redirect to="/home" />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </Admin>
                            )}
                        />
                        <Route component={NotMatch} />
                    </Switch>
                </App>
            </Router>
        );
    }
}
