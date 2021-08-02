import { useCallback, useEffect } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { useAuth } from '../store/auth.context';
import { useRestaurant } from '../store/restaurant.context';

const baseUrl = process.env.REACT_APP_RESTAURANTS_API_URL;

export const useRestaurantsService = () => {
  const {
    get,
    post,
    put,
    delete: deleteHttp,
    response,
  } = useFetch(baseUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const { restaurants, setRestaurants, blockedUsers, setBlockedUsers } =
    useRestaurant();

  const auth = useAuth();
  const isRestaurantOwner = auth.isRestaurantOwner;

  const isEmpty = restaurants.length === 0;

  const add = useCallback(
    async (restaurant: any) => {
      const newRestaurant = await post('/api/restaurants/create', restaurant);
      if (response.ok) {
        setRestaurants((state) => [...state, newRestaurant]);
      }
      return { response };
    },
    [post, response, setRestaurants]
  );

  const edit = useCallback(
    async (restaurant: any) => {
      const updatedRest = await put(
        `/api/restaurants/${restaurant.id}/edit`,
        restaurant
      );
      if (response.ok) {
        setRestaurants((state) => {
          const idx = state.findIndex((r) => r.id === updatedRest.id);
          const updatedRestaurants = [...state];
          updatedRestaurants.splice(idx, 1, updatedRest);
          return updatedRestaurants;
        });
      }
      return { response };
    },
    [put, response, setRestaurants]
  );

  const remove = useCallback(
    async (restaurantId: string) => {
      await deleteHttp(`/api/restaurants/${restaurantId}/delete`);
      if (response.ok) {
        setRestaurants((state) => {
          const idx = state.findIndex((r) => r.id === restaurantId);
          const updatedRestaurants = [...state];
          updatedRestaurants.splice(idx, 1);
          return updatedRestaurants;
        });
      }
      return { response };
    },
    [deleteHttp, response, setRestaurants]
  );

  const listAllRestaurants = useCallback(async () => {
    const result = await get(`/api/restaurants/all`);
    if (response.ok) {
      setRestaurants(result);
    }
    return { result };
  }, [get, response, setRestaurants]);

  const listByOwner = useCallback(async () => {
    const result = await get('/api/restaurants/my-list');
    if (response.ok) {
      setRestaurants(result);
    }
    return { result };
  }, [get, response, setRestaurants]);

  const listBlockedUsers = useCallback(
    async (restaurantId: string) => {
      const result = await get(
        `/api/restaurants/${restaurantId}/blocked-users`
      );
      if (response.ok) {
        setBlockedUsers(result);
      }
      return { result };
    },
    [get, response, setBlockedUsers]
  );

  const blockUser = useCallback(
    async (userEmail: string, restaurantId: string) => {
      await post('/api/restaurants/block-user', {
        userEmail,
        restaurantId,
      });
      if (response.ok) {
        setBlockedUsers((state) => [...state, userEmail]);
      }
      return { response };
    },
    [post, response, setBlockedUsers]
  );

  const unblockUser = useCallback(
    async (userEmail: string, restaurantId: string) => {
      await post('/api/restaurants/unblock-user', {
        userEmail,
        restaurantId,
      });
      if (response.ok) {
        setBlockedUsers((state) => {
          console.log(state);
          const idx = state.indexOf(userEmail);
          state.splice(idx, 1);
          return [...state];
        });
      }
      return { response };
    },
    [post, response, setBlockedUsers]
  );

  useEffect(() => {
    if (isEmpty) {
      if (isRestaurantOwner) {
        listByOwner();
      } else {
        listAllRestaurants();
      }
    }
  }, [listByOwner, listAllRestaurants, isEmpty, isRestaurantOwner]);

  return {
    add,
    edit,
    remove,
    listByOwner,
    listAllRestaurants,
    listBlockedUsers,
    blockUser,
    unblockUser,
    response,
    restaurants,
    blockedUsers,
  };
};
