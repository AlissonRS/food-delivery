import React from 'react';
import { useHistory } from 'react-router-dom';
import { MealModel } from '../../models/Meal.model';
import { useMealsService } from '../../services/meals.service';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardActionArea } from '@material-ui/core';

export interface MealCardProps {
  meal: MealModel;
  isRestaurantOwner: boolean;
  selectable: boolean;
  onMealSelected?: (meal: MealModel) => void;
}

const MealCard: React.FC<MealCardProps> = (props) => {
  const { meal, isRestaurantOwner, selectable, onMealSelected } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const { remove } = useMealsService(meal.restaurantId);

  const history = useHistory();

  const handleDeleteDialogOpen = (e: any) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const handleEdit = () => {
    history.push(`/restaurants/${meal.restaurantId}/meals/${meal.id}/edit`);
  };

  const handleCloseDeleteDialog = (e: any) => {
    e.stopPropagation();
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirmed = async () => {
    await remove(meal.id);
    setOpenDeleteDialog(false);
  };

  const handleMealSelected = () => {
    if (onMealSelected) {
      onMealSelected(meal);
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardActionArea disabled={!selectable} onClick={handleMealSelected}>
          <CardHeader title={meal.name} />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {meal.description}
            </Typography>
            <Typography variant="h5">$ {meal.price}</Typography>
          </CardContent>
        </CardActionArea>
        {isRestaurantOwner && (
          <CardActions>
            <Button aria-label="delete" onClick={handleDeleteDialogOpen}>
              DELETE
            </Button>
            <Button
              color="secondary"
              variant="contained"
              aria-label="edit"
              onClick={handleEdit}
            >
              EDIT
            </Button>
          </CardActions>
        )}
      </Card>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Meal?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Orders containing this meal will be preserved, but people will
            no longer be able to order this meal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
            Yes, Delete it!
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default MealCard;
