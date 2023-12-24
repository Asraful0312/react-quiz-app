import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Account() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-3">
        {currentUser ? (
          <>
            <div className="flex items-center gap-2 dark:text-gray-50">
              <FaRegCircleUser />
              <span>{currentUser.displayName}</span>
            </div>
            <Link
              to="/signup"
              className="text-sm flex items-center dark:text-gray-50 gap-2"
              onClick={logout}
            >
              <MdOutlineLogout />
            </Link>
          </>
        ) : (
          <>
            <Link className="text-sm dark:text-gray-50" to="/signup">
              SignUp
            </Link>
            <Link className="text-sm dark:text-gray-50" to="/login">
              LogIn
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
