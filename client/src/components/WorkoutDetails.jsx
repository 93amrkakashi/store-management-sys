import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";

const WorkoutDetails = ({ product }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const [out, setout] = useState(0);
  const [In, setIn] = useState(0);


  const handleApply = () => {
    // Handle apply action
  };
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/products/" + product._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCTS", payload: json });
    }
  };

  return (
    <tbody>
      <tr key={product.id}>
        <td className="px-4 py-1 border-b border-l">{product.name}</td>
        <td className="px-4 py-1 border-b border-l">{product.initQty}</td>
        <td className="px-4 py-1 border-b border-l">{product.currQty}</td>
        <td className="px-4 py-1 border-b border-l">
          <input
            className="text-black w-20 font-bold"
            type="number"
            onChange={(e) => setout(e.target.value)}
            value={out}
          />
        </td>
        <td className="px-4 py-1 border-b border-l">
          <input
            className="text-black w-20 font-bold"
            type="number"
            onChange={(e) => setIn(e.target.value)}
            value={In}
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

export default WorkoutDetails;
