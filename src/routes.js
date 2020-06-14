import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Cart from './pages/Cart/index'
import Home from './pages/Home/index'

export default function Routes(){
    return (
        <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/cart"} component={Cart}/>
        </Switch>
    )
}

