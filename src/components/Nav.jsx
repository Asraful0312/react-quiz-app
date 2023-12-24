import { Link } from "react-router-dom";
import Account from "./Account";
import { DarkMode } from "./DarkMode";

export default function Nav() {
  return (
    <nav className="bg-white py-3 px-5 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-bold dark:text-gray-50 text-black">
          QUIZ APP
        </Link>
        <div className="flex items-center gap-3">
          <Account />
          <DarkMode />
        </div>
      </div>
    </nav>
  );
}
