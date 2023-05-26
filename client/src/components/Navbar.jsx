import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { DropdownMenu } from './Drobdown'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {
    logout()
  }

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-10 h-[8vh] flex px-3 ">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <h1 className="text-3xl font-bold">Store M S</h1>
        </Link>
        <nav>
          {user && (
            <div className="flex items-center space-x-4">
              <span>{`${user.firstName} ${user.lastName}`}</span>
              {/* <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClick}
              >
                Log out
              </button> */}
              <DropdownMenu />
            </div>
          )}
          {!user && (
            <div className="flex items-center space-x-4">
              <Link
                className="text-white hover:text-gray-300"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-white hover:text-gray-300"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
  
}

export default Navbar