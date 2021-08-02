import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMealsService } from '../../services/meals.service';
import MealCard from '../MealCard/MealCard.lazy';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../store/auth.context';
import { MealModel } from '../../models/Meal.model';

const useStyles = makeStyles((theme) => ({
  meal: {
    margin: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export interface MealListProps {
  restaurantId: string;
  selectable: boolean;
  onMealSelected?: (meal: MealModel) => void;
}

const MealList: React.FC<MealListProps> = (props) => {
  const { restaurantId, selectable, onMealSelected } = props;

  const { meals } = useMealsService(restaurantId);

  const auth = useAuth();
  const isRestaurantOwner = auth.isRestaurantOwner;

  const classes = useStyles();

  const mealList = meals
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    .map((m) => {
      return (
        <div key={m.id} className={classes.meal}>
          <MealCard
            meal={m}
            isRestaurantOwner={isRestaurantOwner}
            selectable={selectable}
            onMealSelected={onMealSelected}
          ></MealCard>
        </div>
      );
    });

  return (
    <div>
      {mealList}
      {isRestaurantOwner && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          component={RouterLink}
          to={`/restaurants/${restaurantId}/meals/add`}
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
};

export default MealList;
