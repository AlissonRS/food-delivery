import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import { MealContextProvider } from '../../../store/meal.context';
import EditRestaurant from '../../EditRestaurant/EditRestaurant.lazy';
import RestaurantList from '../../RestaurantList/RestaurantList.lazy';
import TopNavBar from '../../TopNavBar/TopNavBar.lazy';
import RestaurantDetails from '../../RestaurantDetails/RestaurantDetails.lazy';
import EditMeal from '../../EditMeal/EditMeal.lazy';
import RestaurantMenu from '../../RestaurantMenu/RestaurantMenu.lazy';
import { RestaurantContextProvider } from '../../../store/restaurant.context';

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

const RestaurantRouter: React.FC = () => {
  let { path } = useRouteMatch();

  const classes = useStyles();

  console.log('path', path);

  return (
    <div className={classes.root}>
      <RestaurantContextProvider>
        <MealContextProvider>
          <TopNavBar></TopNavBar>
          <Switch>
            <Route path={path} exact>
              <RestaurantList></RestaurantList>
            </Route>
            <Route path={`${path}/add`}>
              <EditRestaurant></EditRestaurant>
            </Route>
            <Route path={`${path}/:restaurantId/edit`}>
              <EditRestaurant></EditRestaurant>
            </Route>
            <Route path={`${path}/:restaurantId/details`}>
              <RestaurantDetails></RestaurantDetails>
            </Route>
            <Route path={`${path}/:restaurantId/menu`}>
              <RestaurantMenu></RestaurantMenu>
            </Route>
            <Route path={`${path}/:restaurantId/meals/add`}>
              <EditMeal></EditMeal>
            </Route>
            <Route path={`${path}/:restaurantId/meals/:mealId/edit`}>
              <EditMeal></EditMeal>
            </Route>
          </Switch>
        </MealContextProvider>
      </RestaurantContextProvider>
    </div>
  );
};

export default RestaurantRouter;
