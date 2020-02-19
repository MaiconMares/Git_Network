import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Main from "./pages/Main";
import EditUser from "./pages/EditUser";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/edit_user/:id" component={EditUser}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;