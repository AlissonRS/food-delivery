import React from 'react';
import { OrderItemModel } from '../../models/OrderItem.model';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  itemAmount: {
    flexGrow: 0,
  },
  quantity: {
    maxWidth: '30px',
  },
}));

const CenteredInput = withStyles((theme) => ({
  input: {
    textAlign: 'center',
  },
}))(Input);

export interface EditOrderItemListProps {
  orderItems: OrderItemModel[];
  onEditQuantity: (item: OrderItemModel, quantity: number) => void;
  onRemoveItem: (item: OrderItemModel) => void;
}

const EditOrderItemList: React.FC<EditOrderItemListProps> = (props) => {
  const { orderItems, onEditQuantity, onRemoveItem } = props;

  const classes = useStyles();

  const orderItemList = orderItems.map((i, idx) => (
    <React.Fragment key={idx}>
      <ListItem>
        <IconButton
          aria-label="decrement"
          disabled={i.quantity === 1}
          onClick={() => onEditQuantity(i, i.quantity - 1)}
        >
          <RemoveIcon />
        </IconButton>
        <CenteredInput
          value={i.quantity}
          onChange={(event) =>
            onEditQuantity(i, parseInt(event.target.value, 10))
          }
          className={classes.quantity}
        ></CenteredInput>
        <IconButton
          aria-label="increment"
          onClick={() => onEditQuantity(i, i.quantity + 1)}
        >
          <AddIcon />
        </IconButton>
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
        <IconButton aria-label="increment" onClick={() => onRemoveItem(i)}>
          <DeleteIcon />
        </IconButton>
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
        <Box pr={4}>
          <ListItemText primary="Subtotal" />
        </Box>
      </ListItem>
      {orderItemList}
    </List>
  );
};

export default EditOrderItemList;
