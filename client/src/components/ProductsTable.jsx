import { useAuthContext } from "../hooks/useAuthContext";
import TAbleActions from "./TAbleActions";

const ProductsTable = ({
  products,
  filterdProducts,
  fetchProducts,
  setFelterdProducts,
}) => {
  const { user } = useAuthContext();

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

            {user.owner && (
              <>
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
              </>
            )}
          </tr>
        </thead>
        {!filterdProducts
          ? products?.map((product) => (
              <TAbleActions
                key={product._id}
                product={product}
                fetchProducts={fetchProducts}
                setFelterdProducts={setFelterdProducts}
              />
            ))
          : filterdProducts?.map((product) => (
              <TAbleActions
                key={product._id}
                product={product}
                fetchProducts={fetchProducts}
                setFelterdProducts={setFelterdProducts}
              />
            ))}
      </table>
    </div>
  );
};

export default ProductsTable;
