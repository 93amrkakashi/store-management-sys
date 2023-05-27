import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductForm from "../components/ProductForm";
import TAbleActions from "./TAbleActions";

const Table = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

  return (
      <div className=" min-w-full min-h-full ">
        <table className="min-w-full min-h-full bg-gray-800 text-white text-left ">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-l border-t w-5/12	 ">
                Name
              </th>
              <th className="px-4 py-2 border-b border-l border-t w-1/12	">
                Quantity
              </th>
              <th className="px-4 py-2 border-b border-l border-t  w-1/12	">
                Available
              </th>
              <th className="px-4 py-2 border-b border-l border-t  w-1/12	">
                IN
              </th>
              <th className="px-4 py-2 border-b border-l border-t w-1/12	 ">
                OUT
              </th>
              <th className="px-4 py-2 border-b border-l border-t  w-1/12	">
                Delete
              </th>
              <th className="px-4 py-2 border-b border-l border-t  w-1/12	">
                Apply
              </th>
            </tr>
          </thead>
          {products &&
            products.map((product) => (
              <TAbleActions key={product._id} product={product} />
            ))}
        </table>
      </div>
      // {/* <ProductForm /> */}
  );
};

export default Table;
