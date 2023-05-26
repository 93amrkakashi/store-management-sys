import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ product }) => {
  const { dispatch } = useProductsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-3 rounded">
          Edit
        </button>
      </td>
      <td className="px-4 py-1 border-b border-l">
        <button className="bg-red-500 hover:bg-red-700 text-white  py-1 px-3 rounded">
          Delete
        </button>
      </td>
    </tr>
  </tbody>


  );
};

export default WorkoutDetails;
