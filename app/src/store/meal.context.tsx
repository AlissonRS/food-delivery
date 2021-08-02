import React, { Dispatch, SetStateAction, useState } from 'react';
import { MealModel } from '../models/Meal.model';

interface MealContextData {
  meals: MealModel[];
  setMeals: Dispatch<SetStateAction<MealModel[]>>;
}

const data: MealContextData = {
  meals: [],
  setMeals: () => {},
};

const MealContext = React.createContext(data);

export const MealContextProvider = (props: any) => {
  const [meals, setMeals] = useState<MealModel[]>([]);

  const contextValue = {
    meals,
    setMeals,
  };

  return (
    <MealContext.Provider value={contextValue}>
      {props.children}
    </MealContext.Provider>
  );
};

export const useMeal = () => React.useContext(MealContext);
