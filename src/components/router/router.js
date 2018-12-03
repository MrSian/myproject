import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import {Home} from '../page/home/home'
import {Products} from '../page/products/products'
import {Wandering} from '../page/Wandering/Wandering'
import {ShoppingCart} from '../page/ShoppingCart/ShoppingCart'
import {Account} from '../page/account/account'
import {NotFound,Helep} from '../page/NotFound/NotFound'

export default class RouteConfig extends Component{
    render(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/record" component={record} />
            <Route path="/helpcenter" component={helpcenter} />
            <Route path="/production" component={production} />
            <Route path="/balance" component={balance} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      )
    }
  }