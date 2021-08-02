import React, { Dispatch, SetStateAction, useState } from 'react';
import { RestaurantModel } from '../models/Restaurant.model';

interface RestaurantContextData {
  restaurants: RestaurantModel[];
  setRestaurants: Dispatch<SetStateAction<RestaurantModel[]>>;
  blockedUsers: string[];
  setBlockedUsers: Dispatch<SetStateAction<string[]>>;
}

const data: RestaurantContextData = {
  restaurants: [],
  setRestaurants: () => {},
  blockedUsers: [],
  setBlockedUsers: () => {},
};

const RestaurantContext = React.createContext(data);

export const RestaurantContextProvider = (props: any) => {
  const [restaurants, setRestaurants] = useState<RestaurantModel[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const contextValue = {
    restaurants,
    setRestaurants,
    blockedUsers,
    setBlockedUsers,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => React.useContext(RestaurantContext);
