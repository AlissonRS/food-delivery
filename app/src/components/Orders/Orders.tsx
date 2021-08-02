import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { useOrdersService } from '../../services/orders.service';
import OrderCard from '../OrderCard/OrderCard';
import { OrderStatus } from '../../models/OrderStatus.enum';
import { OrderModel } from '../../models/Order.model';
import { TabPanel } from '../TabPanel/TabPanel';

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
  tabs: {
    marginTop: theme.spacing(4),
  },
  tabPanel: {
    flexGrow: 1,
    width: '100%',
  },
}));

const Orders: React.FC = () => {
  const [tabValue, setTab] = useState(0);

  const classes = useStyles();

  const { orders, updateStatus } = useOrdersService();

  const handleTabChange = (event: React.ChangeEvent<{}>, index: number) => {
    setTab(index);
  };

  const handleStatusUpdated = async (
    order: OrderModel,
    nextStatus: OrderStatus
  ) => {
    await updateStatus(order, nextStatus);
  };

  const finishedStatus = [OrderStatus.Cancelled, OrderStatus.Received];

  const sortedOrders = orders.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  const orderCards = sortedOrders
    .filter((o) => !finishedStatus.includes(o.status))
    .map((o) => {
      return (
        <OrderCard
          key={`pending-${o.orderId}`}
          order={o}
          onStatusUpdated={handleStatusUpdated}
        ></OrderCard>
      );
    });

  const orderHistoryCards = sortedOrders
    .filter((o) => finishedStatus.includes(o.status))
    .map((o) => {
      return (
        <OrderCard
          key={`finished-${o.orderId}`}
          order={o}
          onStatusUpdated={handleStatusUpdated}
        ></OrderCard>
      );
    });

  return (
    <div className={classes.root}>
      <Typography variant="h4">Your Orders</Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Orders in Progress" />
        <Tab label="Finished Orders" />
      </Tabs>

      <TabPanel className={classes.tabPanel} value={tabValue} index={0}>
        {orderCards}
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={tabValue} index={1}>
        {orderHistoryCards}
      </TabPanel>
    </div>
  );
};

export default Orders;
