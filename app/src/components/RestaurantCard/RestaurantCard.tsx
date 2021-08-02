import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { RestaurantModel } from '../../models/Restaurant.model';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRestaurantsService } from '../../services/restaurants.service';
import { FoodTypes } from '../../models/FoodType.enum';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../store/auth.context';
import { camelCaseToTitleCase } from '../../utils/string.utils';

export interface RestaurantCardProps {
  restaurant: RestaurantModel;
}

const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const { restaurant } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const auth = useAuth();
  const isRestaurantOwner = auth.isRestaurantOwner;

  const { remove } = useRestaurantsService();

  const history = useHistory();

  const handleOpenRestaurantMeals = () => {
    if (isRestaurantOwner) {
      history.push(`/restaurants/${restaurant.id}/details`);
    } else {
      history.push(`/restaurants/${restaurant.id}/menu`);
    }
  };

  const handleDeleteDialogOpen = (e: any) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    history.push(`/restaurants/${restaurant.id}/edit`);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirmed = async () => {
    await remove(restaurant.id);
    setOpenDeleteDialog(false);
  };

  const [foodType] = Object.entries(FoodTypes).find(
    ([key, value]) => value === restaurant.foodType
  ) || [''];

  const foodTypeLabel = camelCaseToTitleCase(foodType);

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={handleOpenRestaurantMeals}>
        <Card>
          <CardHeader title={restaurant.name} subheader={foodTypeLabel} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {restaurant.description}
            </Typography>
          </CardContent>
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
      </CardActionArea>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Restaurant?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Order's History will be preserved, but people will no longer be
            able to order from this restaurant.
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

export default RestaurantCard;
