import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function ProfileDropdown({ userData, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group" ref={ref}>
      <button className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <div className="border size-7 rounded-full border-green-400 shadow-md flex items-center justify-center">
          <span>{userData && userData.name[0].toUpperCase()}</span>
        </div>
      </button>

      {/* Show on hover (desktop) OR when open state is true (mobile tap) */}
      <div className={`absolute right-0 py-2 top-full z-60 ${open ? "block" : "hidden group-hover:block"}`}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-36 py-1 flex flex-col">
          <Link
            to={userData.id === '6a2d50a10009674ceb87' || userData.email === 'loldeep4646@gmail.com' ? '/admin' : '/orders'}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(false)}
          >
            {userData.id === '6a2d50a10009674ceb87' || userData.email === 'loldeep4646@gmail.com' ? 'Dashboard' : 'Orders'}
          </Link>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;