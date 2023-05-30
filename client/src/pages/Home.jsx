import SubNav from "../components/SubNav";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [filterdProducts, setFelterdProducts] = useState(null);
  const [add, setadd] = useState(false);
  console.log(user);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products", {
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
  }, [dispatch, user, filterdProducts,]);

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3">
      <SubNav
        fetchProducts={fetchProducts}
        products={products}
        setFelterdProducts={setFelterdProducts}
        filterdProducts={filterdProducts}
        setadd={setadd}
        add={add}
      />
      {user.admin && (
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
      )}
    </div>
  );
};

export default Home;
