import { useCallback, useEffect } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { useAuth } from '../store/auth.context';
import { useMeal } from '../store/meal.context';

const baseUrl = process.env.REACT_APP_RESTAURANTS_API_URL;

export const useMealsService = (restaurantId: string) => {
  const {
    get,
    post,
    put,
    delete: deleteHttp,
    response,
  } = useFetch(baseUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const auth = useAuth();
  const currentUserId = auth.getUserId();
  const { meals, setMeals } = useMeal();
  const isEmpty = meals.length === 0;

  const add = useCallback(
    async (meal: any) => {
      const newMeal = await post('/api/meals/create', meal);
      if (response.ok) {
        setMeals((state) => [...state, newMeal]);
      }
      return { response };
    },
    [post, response, setMeals]
  );

  const edit = useCallback(
    async (meal: any) => {
      const updatedRest = await put(`/api/meals/${meal.id}/edit`, meal);
      if (response.ok) {
        setMeals((state) => {
          const idx = state.findIndex((r) => r.id === updatedRest.id);
          const updatedMeals = [...state];
          updatedMeals.splice(idx, 1, updatedRest);
          return updatedMeals;
        });
      }
      return { response };
    },
    [put, response, setMeals]
  );

  const remove = useCallback(
    async (mealId: string) => {
      await deleteHttp(`/api/meals/${mealId}/delete`);
      if (response.ok) {
        setMeals((state) => {
          const idx = state.findIndex((r) => r.id === mealId);
          const updatedMeals = [...state];
          updatedMeals.splice(idx, 1);
          return updatedMeals;
        });
      }
      return { response };
    },
    [deleteHttp, response, setMeals]
  );

  const listByOwner = useCallback(async () => {
    const result = await get(`/api/restaurants/${restaurantId}/meals`);
    if (response.ok) {
      setMeals(result);
    }
    return { result };
  }, [get, response, setMeals, restaurantId]);

  useEffect(() => {
    if (isEmpty) {
      listByOwner();
    }
  }, [listByOwner, currentUserId, isEmpty]);

  return {
    add,
    edit,
    remove,
    response,
    meals,
  };
};
