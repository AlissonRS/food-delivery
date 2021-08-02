import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { OrderModel } from '../../models/Order.model';
import { useOrdersService } from '../../services/orders.service';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import OrderItemList from '../OrderItemList/OrderItemList.lazy';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  info: {
    marginBottom: theme.spacing(4),
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
  },
  orderTotal: {
    alignSelf: 'flex-end',
    marginRight: theme.spacing(2),
  },
  summaryActions: {
    display: 'flex',
    marginTop: theme.spacing(4),
  },
  summaryActionButtons: {
    margin: theme.spacing(2),
  },
}));

export interface CheckoutProps {
  order: OrderModel;
  onGoBack?: () => void;
}

const Checkout: React.FC<CheckoutProps> = (props) => {
  const { order, onGoBack } = props;

  const { add } = useOrdersService();

  const history = useHistory();

  const classes = useStyles();

  const handleCheckout = async () => {
    await add(order);
    history.push('/orders');
  };

  const totalAmount = order.items
    .reduce((total, curr) => total + curr.amount * curr.quantity, 0)
    .toFixed(2);

  return (
    <div className={classes.root}>
      <Typography variant="h4">YOUR ORDER</Typography>
      <div className={classes.orderDetails}>
        <Alert severity="info" className={classes.info}>
          Please <strong>check your order details</strong> below. If you need to
          edit, you can click on the edit order button below. If it looks good,
          you can proceed to checkout 🥰
        </Alert>

        <OrderItemList orderItems={order.items}></OrderItemList>

        <Typography variant="h5" className={classes.orderTotal}>
          Total $ {totalAmount}
        </Typography>
      </div>
      <div className={classes.summaryActions}>
        <Button
          variant="outlined"
          aria-label="go back"
          className={classes.summaryActionButtons}
          onClick={onGoBack}
        >
          EDIT YOUR ORDER
        </Button>
        <Button
          color="secondary"
          variant="contained"
          aria-label="checkout"
          className={classes.summaryActionButtons}
          onClick={handleCheckout}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
