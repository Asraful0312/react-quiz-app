import { Link } from "react-router-dom";

export default function Post(props) {
  const { title, noq, id } = props;

  return (
    <div className="bg-white p-2 dark:bg-slate-700 shadow-md rounded-md">
      {noq > 0 ? (
        <Link to={`/quiz/${id}`} state={title}>
          <img
            src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
          />
        </Link>
      ) : (
        <div>
          <img
            src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
          />
        </div>
      )}

      <h1 className="text-sm font-semibold py-3 dark:text-gray-200 leading-4">
        {title}
      </h1>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold dark:text-gray-200">
          {noq} Qustions
        </h3>
        <h3 className="text-sm font-semibold dark:text-gray-200">
          Total Points: {noq * 5}
        </h3>
      </div>
    </div>
  );
}
