import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuthContext } from "../hooks/useAuthContext";

export const DropdownMenu = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-black"
      >
        <GiHamburgerMenu />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          {user.owner === "true" && (
            <p
              onClick={() => {
                navigate("/admin");
                handleToggle();
              }}
              className=" px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
            >
              Admin Panel
            </p>
          )}
          <p
            onClick={() => logout()}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};
