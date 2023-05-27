import { useState } from "react";
import { FaSearch, FaSync } from "react-icons/fa";

const SubNav = ({ products, setFelterdProducts, fetchProducts }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = () => {
    // Filter the products based on the search input
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
    <nav className="bg-gray-900 py-4 px-6 flex justify-between items-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add a Product
      </button>
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <FaSync />
      </button>
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none"
          />
          <button className="text-gray-500 ml-2" onClick={handleSearchChange}>
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SubNav;
