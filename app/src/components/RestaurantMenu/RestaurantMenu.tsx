import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { MealModel } from '../../models/Meal.model';
import { OrderItemModel } from '../../models/OrderItem.model';
import { OrderModel } from '../../models/Order.model';
import { useRestaurantsService } from '../../services/restaurants.service';
import Checkout from '../Checkout/Checkout.lazy';
import MealList from '../MealList/MealList.lazy';
import { OrderStatus } from '../../models/OrderStatus.enum';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOrderItemList from '../EditOrderItemList/EditOrderItemList.lazy';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
    maxHeight: '100%',
  },
  backButton: {
    cursor: 'pointer',
  },
  titleWrapper: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid gray',
  },
  meals: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  orderSummary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  summaryText: {
    display: 'flex',
    alignItems: 'center',
  },
  summaryActions: {
    display: 'flex',
  },
  summaryActionButtons: {
    margin: theme.spacing(2),
  },
  drawer: {
    width: '240px',
    flexShrink: 0,
  },
  editDialogContent: {
    minWidth: '300px',
  },
  orderTotal: {
    alignSelf: 'flex-end',
    marginRight: theme.spacing(2),
  },
}));

interface RestaurantMenuParams {
  restaurantId: string;
}

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams<RestaurantMenuParams>();
  const { restaurants } = useRestaurantsService();
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const [isInCheckoutReview, setReviewCheckout] = useState(false);
  const [order, setOrder] = useState<OrderModel>({
    items: [],
    history: [],
    status: OrderStatus.Placed,
    createdAt: new Date(),
  });
  const [orderItems, setOrdemItems] = useState<OrderItemModel[]>([]);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const history = useHistory();

  const classes = useStyles();

  const handleGoBackToRestaurantList = () => {
    history.push(`/restaurants`);
  };

  const handleMealSelected = (meal: MealModel) => {
    setOrdemItems((state) => {
      const existingIndex = state.findIndex((i) => i.description === meal.name);
      if (existingIndex > -1) {
        const existingItem = state[existingIndex];
        state.splice(existingIndex, 1, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
        return [...state];
      }
      return [
        ...state,
        {
          amount: meal.price,
          description: meal.name,
          quantity: 1,
        },
      ];
    });
  };

  const handleEmptyBag = () => {
    setOrdemItems([]);
  };

  const handleCheckoutReview = () => {
    setOrder((state) => ({
      ...state,
      payeeId: restaurant?.ownerId,
      items: orderItems,
    }));
    setReviewCheckout(true);
  };

  const handleGoBack = () => {
    setReviewCheckout(false);
  };

  const handleOpenEditDialog = (e: any) => {
    e.stopPropagation();
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = (e: any) => {
    e.stopPropagation();
    setOpenEditDialog(false);
  };

  const handleEditQuantity = (item: OrderItemModel, quantity: number) => {
    setOrdemItems((state) => {
      if (quantity > 0) {
        const existingIndex = state.findIndex(
          (i) => i.description === item.description
        );
        if (existingIndex > -1) {
          const existingItem = state[existingIndex];
          state.splice(existingIndex, 1, {
            ...existingItem,
            quantity,
          });
        }
      }
      return [...state];
    });
  };

  const handleRemoveItem = (item: OrderItemModel) => {
    setOrdemItems((state) => {
      const existingIndex = state.findIndex(
        (i) => i.description === item.description
      );
      if (existingIndex > -1) {
        state.splice(existingIndex, 1);
      }
      return [...state];
    });
  };

  if (!restaurant) {
    return <div></div>;
  }

  const totalAmount = orderItems
    .reduce((total, curr) => total + curr.amount * curr.quantity, 0)
    .toFixed(2);

  const canCheckout = orderItems.length > 0;

  return (
    <div data-testid="RestaurantMenu" className={classes.root}>
      {!isInCheckoutReview && (
        <React.Fragment>
          <div className={classes.titleWrapper}>
            <ArrowBack
              fontSize="large"
              className={classes.backButton}
              onClick={handleGoBackToRestaurantList}
            />
            <Typography variant="h5" className={classes.title}>
              {restaurant.name}
            </Typography>
          </div>

          <Alert severity="info" className={classes.description}>
            <Typography variant="subtitle1">
              {restaurant.description}
            </Typography>
          </Alert>

          <div className={classes.meals}>
            <Typography variant="h6" gutterBottom>
              Select your Meals
            </Typography>
            <MealList
              restaurantId={restaurant.id}
              selectable={true}
              onMealSelected={handleMealSelected}
            ></MealList>
          </div>
          {orderItems.length && (
            <Drawer
              variant="permanent"
              anchor="bottom"
              className={classes.drawer}
            >
              <Box>
                <div className={classes.orderSummary}>
                  <div className={classes.summaryText}>
                    <Box px={2}>
                      <Badge badgeContent={orderItems.length} color="primary">
                        <ShoppingBasketIcon />
                      </Badge>
                    </Box>
                    <Typography>
                      <Box px={2} fontWeight="fontWeightBold">
                        TOTAL: $ {totalAmount}
                      </Box>
                    </Typography>
                  </div>
                  <div className={classes.summaryActions}>
                    <Button
                      variant="outlined"
                      aria-label="empty bag"
                      className={classes.summaryActionButtons}
                      onClick={handleEmptyBag}
                    >
                      EMPTY BAG
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      aria-label="edit"
                      disabled={!canCheckout}
                      className={classes.summaryActionButtons}
                      onClick={handleOpenEditDialog}
                    >
                      EDIT
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      aria-label="next"
                      disabled={!canCheckout}
                      className={classes.summaryActionButtons}
                      onClick={handleCheckoutReview}
                    >
                      NEXT
                    </Button>
                  </div>
                </div>
              </Box>
            </Drawer>
          )}
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit your order</DialogTitle>
            <DialogContent className={classes.editDialogContent}>
              <EditOrderItemList
                orderItems={orderItems}
                onEditQuantity={handleEditQuantity}
                onRemoveItem={handleRemoveItem}
              ></EditOrderItemList>

              <Typography variant="h5" className={classes.orderTotal}>
                Total $ {totalAmount}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      {isInCheckoutReview && (
        <Checkout order={order} onGoBack={handleGoBack}></Checkout>
      )}
    </div>
  );
};

export default RestaurantMenu;
