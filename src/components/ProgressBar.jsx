import { Link } from "react-router-dom";
import InputText from "../components/InputText";

export default function ProgressBar() {
  return (
    <div className="bg-white p-2 flex items-center rounded-md">
      <InputText className="w-full" type="range" />
      <Link
        className="w-[150px] bg-green-400 py-1 rounded-md text-sm font-bold text-center"
        to="/result"
      >
        Next Qustion
      </Link>
    </div>
  );
}
