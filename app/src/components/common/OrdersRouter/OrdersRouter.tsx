import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import TopNavBar from '../../TopNavBar/TopNavBar.lazy';
import Orders from '../../Orders/Orders.lazy';
import { OrdersContextProvider } from '../../../store/orders.context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey['100'],
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'auto',
  },
}));

const OrdersRouter: React.FC = () => {
  let { path, url } = useRouteMatch();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OrdersContextProvider>
        <TopNavBar></TopNavBar>
        <Switch>
          <Route path={path} exact>
            <Orders></Orders>
          </Route>
          <Route path="*">
            <Redirect to={url}></Redirect>
          </Route>
        </Switch>
      </OrdersContextProvider>
    </div>
  );
};

export default OrdersRouter;
