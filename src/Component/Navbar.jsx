import {Link} from "react-router-dom"

function Navbar() {
    return (
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center px-6 py-8 border-b bg-blue-200 fixed top-0 left-0 right-0 ">
          <div className="flex items-center">
            <img src="/cart.webp" alt="Logo" className="h-10 w-auto rounded-full" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Tech Titans
            </span>
          </div>
  
          <nav className="flex space-x-8 text-xl">
            <a href="#" className="text-gray-700 hover:text-blue-700">
              HOME
            </a>
            <a href="/profile" className="text-gray-700 hover:text-blue-700">
              PROFILE
            </a>
            <a href="/login" className="text-gray-700 hover:text-blue-700">
              LOG OUT
            </a>
          </nav>
  
          <div className="flex items-center space-x-4 text-xl">
            <Link to={('/login')}>
            <button className="text-gray-700 hover:text-blue-700">SIGN IN</button>
            </Link>
            <Link to={('/register')}>
            <button className="border border-gray-900 text-gray-900 hover:bg-gray-100 py-1 px-4 rounded-full">
              SIGN UP
            </button></Link>

          </div>
        </header>
      </div>
    );
  }
  
  export default Navbar;
  