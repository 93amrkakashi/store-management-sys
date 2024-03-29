import SubNav from "../components/SubNav";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";
import { url } from "../const";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [filterdProducts, setFelterdProducts] = useState(null);
  const [add, setadd] = useState(false);

  const fetchProducts = async () => {
    const response = await fetch(`${url}/products`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_PRODUCTS", payload: json });
    }
  };
  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user, filterdProducts]);

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3 bg-gray-800">
      {user.admin === 'true' && (
      <SubNav
        fetchProducts={fetchProducts}
        products={products}
        setFelterdProducts={setFelterdProducts}
        filterdProducts={filterdProducts}
        setadd={setadd}
        add={add}
      />)}
      <div className="flex flex-col">
        {user.admin=== 'true' ? (
          <>
            <ProductsTable
              fetchProducts={fetchProducts}
              products={products}
              filterdProducts={filterdProducts}
              setFelterdProducts={setFelterdProducts}
            />
            <ProductForm
              add={add}
              setadd={setadd}
              fetchProducts={fetchProducts}
            />
          </>
        ): <h1 className="text-3xl mb-4 text-center text-white font-bold"> You Must Be An Admin To Work Here !!!</h1> }
      </div>
    </div>
  );
};

export default Home;
