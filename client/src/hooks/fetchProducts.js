import { useEffect } from "react";
import { useProductsContext } from "./useProductsContext";
import { url } from "../const";



export const useFetchProducts = (user) => {
  const { dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${url}/products`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch, user]);
};