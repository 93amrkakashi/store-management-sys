import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const TAbleActions = ({ product, fetchProducts, setFelterdProducts }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [out, setOut] = useState("");
  const [In, setIn] = useState("");

  const handleApply = async () => {
    try {
      const updatedData = {
        initQty: product.initQty + Number(In),
        currQty: product.currQty - Number(out),
      };

      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedProduct = {
          initQty: product.initQty + Number(In),
          currQty: product.currQty - Number(out),
        };
        dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
        setIn("");
        setOut("");
        setFelterdProducts("");
        fetchProducts();
        console.log("Product updated successfully");
      } else {
        console.log("Error updating product", response);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/products/${product._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <tbody>
      <tr>
        <td className="px-4 py-1 border-b border-l">{product.name}</td>
        <td className="px-4 py-1 border-b border-l">{product.initQty}</td>
        <td className="px-4 py-1 border-b border-l">{product.currQty}</td>
        <td className="px-4 py-1 border-b border-l">
          <input
            value={In}
            className="text-black w-20 font-bold"
            type="number"
            onChange={(e) => setIn(e.target.value)}
          />
        </td>
        <td className="px-4 py-1 border-b border-l">
          <input
            value={out}
            className="text-black w-20 font-bold"
            type="number"
            onChange={(e) => setOut(e.target.value)}
          />
        </td>
        <td className="px-4 py-1 border-b border-l">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold  px-2 rounded mr-2"
          >
            Delete
          </button>
        </td>
        <td className="px-4 py-1 border-b border-l">
          <button
            onClick={handleApply}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded"
          >
            Apply
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default TAbleActions;
