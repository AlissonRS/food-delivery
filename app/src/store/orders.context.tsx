import React, { Dispatch, SetStateAction, useState } from 'react';
import { OrderModel } from '../models/Order.model';

interface OrdersContextData {
  orders: OrderModel[];
  setOrders: Dispatch<SetStateAction<OrderModel[]>>;
}

const data: OrdersContextData = {
  orders: [],
  setOrders: () => {},
};

const OrdersContext = React.createContext(data);

export const OrdersContextProvider = (props: any) => {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  const contextValue = {
    orders,
    setOrders,
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => React.useContext(OrdersContext);
