import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react';
import { useRestaurantsService } from '../../services/restaurants.service';
import RestaurantCard from '../RestaurantCard/RestaurantCard.lazy';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../store/auth.context';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  titleWrapper: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  restaurant: {
    margin: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    border: '1px solid gray',
  },
}));

const RestaurantList: React.FC = () => {
  const { restaurants, listByOwner, listAllRestaurants } =
    useRestaurantsService();

  const classes = useStyles();

  const auth = useAuth();
  const isRestaurantOwner = auth.isRestaurantOwner;

  const restList = restaurants
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    .map((r) => {
      return (
        <div key={r.id} className={classes.restaurant}>
          <RestaurantCard restaurant={r}></RestaurantCard>
        </div>
      );
    });

  const title = isRestaurantOwner ? 'MY RESTAURANTS' : 'SELECT A RESTAURANT';

  useEffect(() => {
    if (isRestaurantOwner) {
      listByOwner();
    } else {
      listAllRestaurants();
    }
  }, [listByOwner, listAllRestaurants, isRestaurantOwner]);

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </div>
      {restaurants.length > 0 && (
        <Alert severity="info" className={classes.description}>
          <Typography variant="subtitle1">
            Select a restaurant to edit its meals
          </Typography>
        </Alert>
      )}

      {restList}
      {auth.isRestaurantOwner && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          component={RouterLink}
          to="/restaurants/add"
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
};

export default RestaurantList;
