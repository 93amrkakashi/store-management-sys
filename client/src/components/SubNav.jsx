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
    <nav className="bg-gray-900 py-4 px-6 flex flex-wrap justify-between items-center">
      <button
        onClick={() => setadd(!add)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
      >
        Add a Product
      </button>
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 sm:ml-4"
      >
        <FaSync />
      </button>
      <div className="flex items-center ml-2 sm:ml-4 mt-2 sm:mt-0">
        <div className="mr-2 sm:mr-4 flex items-center">
          <form onSubmit={handleSearchChange}>
            <input
              name="inbut"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none w-32 sm:w-40"
            />
            <button className="text-gray-500 ml-2" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default SubNav;
