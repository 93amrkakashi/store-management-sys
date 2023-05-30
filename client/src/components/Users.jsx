import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Users = () => {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-w-full h-full overflow-y-scroll p-3 flex  justify-center flex-wrap gap-5">
      {user.owner ? (
        <>
          {users.map((user) => (
            <Link className='bg-gray-700 px-2 py-4 rounded-md w-2/3 md:w-3/12 text-white text-center' key={user._id} to={`/admin/users/${user._id}`}>
              <div >
                <h2 className="text-lg font-bold mb-2">
                  {`Name : ${user.firstName} ${user.lastName}`}
                </h2>
                <p className="text-lg font-semibold mb-2">{`Owner : ${
                  user.owner === 'true' ? 'Yes' : 'No'
                }`}</p>
                <p className="text-lg font-semibold mb-2">{`Admin : ${
                  user.admin === 'true' ? 'Yes' : 'No'
                }`}</p>

                <p className="text-md font-semibold mb-2">{`Email : ${user.email}`}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <h1>You are not the Owner.... Get the Hell out of here!!!</h1>
      )}
    </div>
  );
};

export default Users;
