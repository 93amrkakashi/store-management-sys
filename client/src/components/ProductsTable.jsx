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
    <div className="min-w-full min-h-full">
      <table className="min-w-full min-h-full bg-gray-800 text-white text-left">
        <thead>
          <tr>
            <th className="px-1 py-2 border-b border-l border-t w-5/12 sm:w-auto">
              Name
            </th>
            {/* <th className="px-1 py-2 border-b border-l border-t w-auto sm:w-auto">
              Quantity
            </th> */}
            <th className="text-center px-1 py-2 border-b border-l border-t w-auto sm:w-auto">
              Available
            </th>

            {user.admin && (
              <>
                <th className="text-center text=center px-1 py-2 border-b border-l border-t w-auto sm:w-auto">
                  IN
                </th>
                <th className="text-center px-1 py-2 border-b border-l border-t w-auto sm:w-auto">
                  OUT
                </th>
                <th
                  className="text-center px-1 py-2 border-b border-l border-t text-center"
                  colSpan={2}
                >
                  actions
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
