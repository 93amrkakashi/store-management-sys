import Table from "../components/Table";
import SubNav from "../components/SubNav";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [filterdProducts, setFelterdProducts] = useState(null);
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
  }, [dispatch, user, filterdProducts]);

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3">
      <SubNav
        fetchProducts={fetchProducts}
        products={products}
        setFelterdProducts={setFelterdProducts}
        filterdProducts={filterdProducts}
      />
      <Table
        fetchProducts={fetchProducts}
        products={products}
        filterdProducts={filterdProducts}
        setFelterdProducts={setFelterdProducts}
      />
      {/* <ProductForm /> */}
    </div>
  );
};

export default Home;
