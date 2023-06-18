import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../const";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";

const TAbleActions = ({ product, fetchProducts, setFelterdProducts }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [out, setOut] = useState("");
  const [In, setIn] = useState("");
  const userName = `${user?.firstName} ${user?.lastName}`;

  const handleApply = async () => {
    const updatedData = {
      initQty: product.initQty + Number(In),
      currQty: product.currQty - Number(out),
    };

    if (In) {
      updatedData.currQty = product.currQty + Number(In);
      updatedData.in = [
        ...product.in,
        `${In}@${product.updatedAt}@${userName}`,
      ];
    }

    if (out) {
      updatedData.out = [
        ...product.out,
        `${out}@${product.updatedAt}@${userName}`,
      ];
    }

    if (In && out) {
      updatedData.currQty = product.currQty + Number(In);
      updatedData.in = [
        ...product.in,
        `${In}@${product.updatedAt}@${userName}`,
      ];
      updatedData.out = [
        ...product.out,
        `${out}@${product.updatedAt}@${userName}`,
      ];
    }
    //
    try {
      const response = await fetch(`${url}/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedProduct = {
          initQty: product.initQty + Number(In),
          currQty: product.currQty - Number(out),
          out: [...product.out, out],
          in: [...product.in, In],
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
      `${url}/products/${product._id}`,
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
        {user.owner ? (
          <td className="px-2 py-1 border-b border-l">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </td>
        ) : (
          <td className="px-2 py-1 border-b border-l">{product.name}</td>
        )}
        {/* <td className="px-2 py-1 border-b border-l">{product.initQty}</td> */}
        <td className="text-center px-2 py-1 border-b border-l">{product.currQty}</td>
        {user.owner && (
          <>
            <td className="text-center   py-1 border-b border-l">
              <input
                name="inbut"
                value={In}
                className="text-center  text-black  font-bold w-[70px]"
                type="number"
                onChange={(e) => setIn(e.target.value)}
              />
            </td>
            <td className="text-center   py-1 border-b border-l">
              <input
                name="inbut"
                value={out}
                className="text-center  text-black w-[70px] font-bold "
                type="number"
                onChange={(e) => setOut(e.target.value)}
              />
            </td>
            <td className="text-center px-4 py-1 border-b border-l text-red-500 hover:text-red-700 text-2xl font-bold text-center">
              <button
                onClick={handleDelete}
              >
                <AiFillDelete />
              </button>
            </td>
            <td className="text-center  px-4 py-1 border-b border-l border-r hover:text-blue-700 text-blue-500 text-2xl font-bold text-center">
              <button
                onClick={handleApply}
              >
                <MdOutlineDoneOutline />
              </button>
            </td>
          </>
        )}
      </tr>
    </tbody>
  );
};

export default TAbleActions;
