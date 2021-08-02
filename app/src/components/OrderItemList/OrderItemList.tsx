import React from 'react';
import { OrderItemModel } from '../../models/OrderItem.model';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  itemAmount: {
    flexGrow: 0,
  },
}));

export interface OrderItemListProps {
  orderItems: OrderItemModel[];
}

const OrderItemList: React.FC<OrderItemListProps> = (props) => {
  const { orderItems } = props;

  const classes = useStyles();

  const orderItemList = orderItems.map((i, idx) => (
    <React.Fragment key={idx}>
      <ListItem>
        <Box>
          <ListItemText primary={i.quantity} />
        </Box>
        <Box px={2}>
          <ListItemText primary="x" />
        </Box>
        <Box pr={6} flexGrow={1}>
          <ListItemText primary={i.description} />
        </Box>
        <Box pr={4}>
          <ListItemText
            primary={`$ ${i.amount.toFixed(2)}`}
            className={classes.itemAmount}
          />
        </Box>
        <Box>
          <ListItemText
            primary={`$ ${(i.amount * i.quantity).toFixed(2)}`}
            className={classes.itemAmount}
          />
        </Box>
      </ListItem>
      <Divider></Divider>
    </React.Fragment>
  ));

  return (
    <List component="nav" aria-label="secondary">
      <ListItem>
        <Box pr={6} flexGrow={1}>
          <ListItemText primary="Description" />
        </Box>
        <Box pr={4}>
          <ListItemText primary="Unit Price" />
        </Box>
        <Box>
          <ListItemText primary="Subtotal" />
        </Box>
      </ListItem>
      {orderItemList}
    </List>
  );
};

export default OrderItemList;
