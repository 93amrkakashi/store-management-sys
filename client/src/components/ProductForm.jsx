import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = ({add, setadd, fetchProducts}) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [initQty, setinitQty] = useState('');
  const [currQty, setcurrQty] = useState(0);
  const [out, setout] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const Product = { name, description, initQty };

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: JSON.stringify(Product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setname("");
      setdescription("");
      setinitQty('');
      setcurrQty(0);
      setError(null);
      setadd(!add)
      setEmptyFields([]);
      dispatch({ type: "CREATE_PRODUCTS", payload: json });
      fetchProducts()
    }
  };

  return (
    <form className={`absolute transition-all duration-500  left-1/2 transform -translate-x-1/2  w-[50%] bg-gray-800 p-4 rounded-lg text-white ${add ? 'flex top-[30%] ' : 'hidden top-[-50%]'} flex-col gap-2`} onSubmit={handleSubmit}>
      <h3 className="text-center font-bold">Add a New Product</h3>

      <label>Product name:</label>
      <input
        type="text"
        onChange={(e) => setname(e.target.value)}
        value={name}
        className='bg-gray-700 text-white py-2 px-4 rounded-lg'
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setinitQty(e.target.value)}
        value={initQty}
        className='bg-gray-700 text-white py-2 px-4 rounded-lg'
      />

      <label>description:</label>
      <input
        type="text"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className='bg-gray-700 text-white py-2 px-4 rounded-lg'
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Product
        </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;
