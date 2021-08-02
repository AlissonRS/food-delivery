import { useCallback, useEffect } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { OrderModel } from '../models/Order.model';
import { OrderStatus } from '../models/OrderStatus.enum';
import { useOrders } from '../store/orders.context';

const baseUrl = process.env.REACT_APP_ORDERS_API_URL;

export const useOrdersService = () => {
  const { get, post, put, response } = useFetch(baseUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const { orders, setOrders } = useOrders();

  const isEmpty = orders.length === 0;

  const add = useCallback(
    async (order: OrderModel) => {
      const newOrder = await post('/api/orders/create', order);
      if (response.ok) {
        setOrders((state) => [...state, newOrder]);
      }
      return { response };
    },
    [post, response, setOrders]
  );

  const list = useCallback(async () => {
    const result = await get(`/api/orders`);
    if (response.ok) {
      setOrders(result);
    }
    return { result };
  }, [get, response, setOrders]);

  const updateStatus = useCallback(
    async (order: OrderModel, nextStatus: OrderStatus) => {
      const updatedRest = await put(`/api/orders/update-status`, {
        orderId: order.orderId,
        status: nextStatus,
      });
      if (response.ok) {
        setOrders((state) => {
          const idx = state.findIndex((r) => r.orderId === updatedRest.orderId);
          const updatedOrders = [...state];
          updatedOrders.splice(idx, 1, updatedRest);
          return updatedOrders;
        });
      } else {
        await list();
      }
      return { response };
    },
    [put, response, setOrders, list]
  );

  useEffect(() => {
    if (isEmpty) {
      list();
    }
  }, [list, isEmpty]);

  return {
    add,
    updateStatus,
    list,
    response,
    orders,
  };
};
