import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
const TAbleActions = ({ product, fetchProducts, setFelterdProducts }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [out, setOut] = useState("");
  const [In, setIn] = useState("");
  const userName = `${user?.firstName} ${user?.lastName}`;

  const handleApply = async () => {
    // const updatedData = {
    //   initQty: product.initQty + Number(In),
    //   currQty: product.currQty - Number(out),
    //   out: [...product.out, out],
    //   outDate: [...product.outDate, product.updatedAt],
    // };

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
          out: [...product.out, out],
          // outDate: [...product.outDate, product.updatedAt],
          in: [...product.in, In],
          // inDate: [...product.inDate, product.updatedAt],
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

  // const date = parseISO(product.updatedAt);
  // const dayOfWeek = format(date, 'EEEE');
  // const formattedDate = format(date, `'${dayOfWeek}' - dd/MM/yyyy - 'at' h:mm:ss a`);

  useEffect(() => {}, [dispatch]);

  return (
    <tbody>
      <tr>
        {user.owner ? (
          <td className="px-4 py-1 border-b border-l">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </td>
        ) : (
          <td className="px-4 py-1 border-b border-l">{product.name}</td>
        )}
        <td className="px-4 py-1 border-b border-l">{product.initQty}</td>
        <td className="px-4 py-1 border-b border-l">{product.currQty}</td>
        {user.owner && (
          <>
            <td className="px-4 py-1 border-b border-l">
              <input
                name="inbut"
                value={In}
                className="text-black w-20 font-bold"
                type="number"
                onChange={(e) => setIn(e.target.value)}
              />
            </td>
            <td className="px-4 py-1 border-b border-l">
              <input
                name="inbut"
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
          </>
        )}
      </tr>
    </tbody>
  );
};

export default TAbleActions;
