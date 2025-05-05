import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-zinc-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold text-md p-2"
                  : "text-gray-400 font-semibold text-md p-2"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/users" //  updated from /home to /users
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold text-md p-2"
                  : "text-gray-400 font-semibold text-md p-2"
              }
            >
              Users
            </NavLink>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium hover:text-zinc-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
