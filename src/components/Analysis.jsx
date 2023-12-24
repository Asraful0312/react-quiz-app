import Image from "../assets/img/i.png";
import { useFetch } from "../hooks/useFetch";
import loadingImg from "../assets/loading.gif";
import ErrorField from "./ErrorField";

export default function Analysis({ score, noq }) {
  const pexelApi = import.meta.env.VITE_REACT_APP_PEXELS_API;

  const getKeyword = () => {
    if ((score / noq) * 5 * 100 < 50) {
      return "failed";
    } else if ((score / noq) * 5 * 100 < 75) {
      return "good";
    } else if ((score / noq) * 5 * 100 <= 100) {
      return "very good";
    }
  };

  const keyword = getKeyword();

  const { error, loading, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${keyword}&per_page=1`,
    "GET",
    {
      Authorization: pexelApi,
    }
  );

  const apiImage = result?.photos[0]?.src.medium || Image;

  return (
    <>
      <div className="flex gap-16 justify-between h-[350px] mt-5">
        <div className="w-[50%] flex items-center justify-center">
          <h1 className="text-xl font-bold dark:text-gray-200">
            Your Score {score} Out of {noq}
          </h1>
        </div>
        {loading && (
          <div className="flex items-center w-full h-screen justify-center dark:text-gray-200">
            <img className="w-1/2 h-screen" src={loadingImg} />
          </div>
        )}
        {error && <ErrorField text="There is an Error!" />}
        {!loading && !error && (
          <img width="50%" height="70vh" src={apiImage} alt="" />
        )}
      </div>
    </>
  );
}
