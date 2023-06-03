import { useState } from "react";
import { FaSearch, FaSync } from "react-icons/fa";

const SubNav = ({
  products,
  setFelterdProducts,
  fetchProducts,
  setadd,
  add,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    e.preventDefault();
    const filtered = products?.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(filtered);
    setSearchValue("");
    setFelterdProducts(filtered);
  };
  const handleRefresh = () => {
    setSearchValue("");
    setFelterdProducts("");
    fetchProducts();
  };
  return (
    <nav className="bg-gray-900 py-2 px-3 flex flex-wrap justify-between items-center rounded-md my-2">
      <button
        onClick={() => setadd(!add)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded "
      >
        Add a Product
      </button>
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded "
      >
        <FaSync />
      </button>
      <div className="flex items-center ">
        <div>
          <form onSubmit={handleSearchChange} className="flex">
            <input
              name="inbut"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-white-500 text-black font-semibold py-1 px-2 rounded-l-md focus:outline-none w-32 sm:w-40 border-r-0"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md  " type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default SubNav;
