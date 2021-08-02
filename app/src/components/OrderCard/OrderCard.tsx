import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { OrderModel } from '../../models/Order.model';
import { Paper } from '@material-ui/core';
import OrderItemList from '../OrderItemList/OrderItemList';
import { makeStyles } from '@material-ui/core/styles';
import { OrderStatus } from '../../models/OrderStatus.enum';
import { useAuth } from '../../store/auth.context';
import { camelCaseToTitleCase } from '../../utils/string.utils';
import Chip from '@material-ui/core/Chip';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { formatDateToLocal } from '../../utils/date.utils';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  orderStatus: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
  orderTotal: {
    justifySelf: 'flex-end',
  },
  summaryActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  summaryActionButtons: {
    margin: theme.spacing(2),
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
}));

export interface OrderCardProps {
  order: OrderModel;
  onStatusUpdated?: (order: OrderModel, nextStatus: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = (props: OrderCardProps) => {
  const { order, onStatusUpdated } = props;

  const auth = useAuth();

  const classes = useStyles();

  const totalAmount = order.items
    .reduce((total, curr) => total + curr.amount * curr.quantity, 0)
    .toFixed(2);

  let canPerformNextAction = auth.isRestaurantOwner;
  let nextAction = OrderStatus.Cancelled;
  let nextActionLabel = 'Cancel';
  // order status is not allowed to move back to previous status
  switch (order.status) {
    case OrderStatus.Placed:
      nextAction = auth.isRestaurantOwner
        ? OrderStatus.Processing
        : OrderStatus.Cancelled;
      canPerformNextAction = true; // both regular users and restaurant owners can change the order status (to cancelled)
      break;

    case OrderStatus.Processing:
      nextAction = OrderStatus.InRoute;
      break;
    case OrderStatus.InRoute:
      nextAction = OrderStatus.Delivered;
      break;
    case OrderStatus.Delivered:
      nextAction = OrderStatus.Received;
      canPerformNextAction = !auth.isRestaurantOwner; // only user can mark order as received
      break;
    default:
      canPerformNextAction = false;
      break;
  }

  const currentStatusLabel = camelCaseToTitleCase(OrderStatus[order.status]);

  if (nextAction !== OrderStatus.Cancelled) {
    nextActionLabel = camelCaseToTitleCase(OrderStatus[nextAction]);
  }

  const handleOnClick = () => {
    if (onStatusUpdated) {
      onStatusUpdated(order, nextAction);
    }
  };

  const date = formatDateToLocal(order.createdAt);

  return (
    <Paper>
      <div className={classes.orderDetails}>
        <Typography variant="subtitle1">Order {order.orderId}</Typography>

        <div className={classes.subtitle}>
          <div className={classes.orderStatus}>
            <Chip label={currentStatusLabel} color="secondary" />
          </div>
          <Typography variant="subtitle1" className={classes.orderTotal}>
            <strong> Total $ {totalAmount}</strong>
          </Typography>
        </div>
        <Typography variant="subtitle1">Created at {date}</Typography>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Order Items</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <OrderItemList orderItems={order.items}></OrderItemList>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Status History</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Stepper activeStep={order.history.length - 1} orientation="vertical">
            {order.history
              .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
              .map((statusHistory) => {
                const label = camelCaseToTitleCase(
                  OrderStatus[statusHistory.orderStatus]
                );
                const date = new Date(statusHistory.createdAt).toLocaleString();
                return (
                  <Step key={statusHistory.orderStatus}>
                    <StepLabel>
                      {label} at {date}
                    </StepLabel>
                  </Step>
                );
              })}
          </Stepper>
        </AccordionDetails>
      </Accordion>
      {canPerformNextAction && (
        <div className={classes.summaryActions}>
          <Button
            color="secondary"
            variant="contained"
            aria-label="checkout"
            className={classes.summaryActionButtons}
            onClick={handleOnClick}
          >
            {nextActionLabel}
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default OrderCard;
