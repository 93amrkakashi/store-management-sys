import { format } from "date-fns";
import React from "react";

export const TableP = ({product, title}) =>{

  return (
    <div>
      <h2>{title.toUpperCase()}</h2>
      <table className="min-w-full min-h-full bg-gray-800 text-white text-left ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-l border-t w-1/12	 ">
              Index
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-3/12	 ">
              Date
            </th>
            {/* <th className="px-4 py-2 border-b border-l border-t w-2/12	">
              Quantity In
            </th> */}
            <th className="px-4 py-2 border-b border-l border-t w-2/12	">
              Quantity
            </th>
            <th className="px-4 py-2 border-b border-l border-t w-3/12	 ">
              Modifier
            </th>
          </tr>
        </thead>

        <tbody>
          {title === 'out' ? product.out.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{index + 1}</td>
              <td className="px-4 py-2 border-b border-l">
                {format(
                  new Date(product.outDate[index]),
                  "EEEE - dd/MM/yyyy - 'at' hh:mm a"
                )}
              </td>{" "}
              {/* <td className="px-4 py-2 border-b border-l">Quantity In Value</td> */}
              <td className="px-4 py-2 border-b border-l">{item}</td>
              <td className="px-4 py-2 border-b border-l">
                {product.modifier[index]}
              </td>
            </tr>
          )):
          product.in.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-l">{index + 1}</td>
              <td className="px-4 py-2 border-b border-l">
                {format(
                  new Date(product.inDate[index]),
                  "EEEE - dd/MM/yyyy - 'at' hh:mm a"
                )}
              </td>{" "}
              {/* <td className="px-4 py-2 border-b border-l">Quantity In Value</td> */}
              <td className="px-4 py-2 border-b border-l">{item}</td>
              <td className="px-4 py-2 border-b border-l">
                {product.modifier[index]}
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );

}



const ProductTable = ({ product }) => {
  console.log(product);
  // const date = parseISO(product.updatedAt);
  // const dayOfWeek = format(date, 'EEEE');
  // const formattedDate = format(date, `'${dayOfWeek}' - dd/MM/yyyy - 'at' h:mm:ss a`);

  return (
  <>
  <TableP product={product} title={'out'}/>
  <TableP product={product}title={'in'}/>
  </>
  );
};

export default ProductTable;

// {product.out.map((p) => ( <tr>
//   <td className="px-4 py-1 border-b border-l">{p}</td>
// </tr>))}

// {/* <td className="px-4 py-1 border-b border-l">{product.initQty}</td>
// {product.out.map((p) => <td className="px-4 py-1 border-b border-l">{p}</td>)  }
// <td className="px-4 py-1 border-b border-l">{product.currQty}</td> */}
