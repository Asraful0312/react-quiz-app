import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Answers from "../Answers";
import Play from "../Play";
import Video from "../Video";
import useQustions from "../../hooks/useQustions";
import { useEffect, useReducer, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { FcPrevious } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";
import image from "../../assets/loading.gif";

// reducer
const inisialize = null;

const rducer = (state, action) => {
  switch (action.type) {
    case "qustions":
      action.value.forEach((qus) => {
        qus.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const qustions = cloneDeep(state);
      qustions[action.qustionID].options[action.optionsIndex].checked =
        action.value;
      return qustions;

    default:
      return state;
  }
};

//quiz component
export default function Quiz() {
  const { id } = useParams();
  const { qustion, error, loading } = useQustions(id);
  const [curentQus, setCurrentQus] = useState(0);
  const [status, setStatus] = useState(false);
  const buttonRef = useRef();
  const playerRef = useRef();
  const location = useLocation();
  const data = location.state;

  const [qna, depatch] = useReducer(rducer, inisialize);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    depatch({
      type: "qustions",
      value: qustion,
    });
  }, [qustion]);

  //checkbox fuction
  const handleCheckbox = (e, index) => {
    depatch({
      type: "answer",
      qustionID: curentQus,
      optionsIndex: index,
      value: e.target.checked,
    });
  };

  //next button
  const handleNextButton = () => {
    if (curentQus <= qustion.length) {
      setCurrentQus((preQus) => preQus + 1);
    }
  };

  //prev button
  const handlePrevButton = () => {
    if (curentQus >= 1 && curentQus <= qustion.length) {
      setCurrentQus((preQus) => preQus - 1);
    }
  };

  // submit button
  const handleSubmit = async () => {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    // set data to firebase
    set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, { state: qna });
  };

  // mini player
  const togggleMiniPlayer = () => {
    if (status) {
      setStatus(false);
      buttonRef.current.classList.add("hidden");
      playerRef.current.classList.remove("hidden");
    } else {
      setStatus(true);
      buttonRef.current.classList.remove("hidden");
      playerRef.current.classList.add("hidden");
    }
  };

  const percentage =
    qustion.length > 0 ? ((curentQus + 1) / qustion.length) * 100 : 0;

  return (
    <>
      {loading && (
        <div className="flex items-center w-full h-screen justify-center dark:text-gray-200">
          <img className="w-10 h-10" src={image} />
        </div>
      )}
      {error && (
        <h1 className="dark:text-gray-200 h-screen">There was a Error!</h1>
      )}
      {!loading && !error && qna.length > 0 && (
        <>
          <h1 className="font-bold text-2xl dark:text-gray-50">
            {qna[curentQus].title}
          </h1>
          <p className="text-sm font-semibold pb-1 mt-2 dark:text-gray-50 text-gray-500 border-b border-gray-300">
            Qustions can have multiple answers
          </p>

          <div className="pb-16">
            <Answers
              input
              handleChange={handleCheckbox}
              options={qna[curentQus].options}
            />
          </div>

          <footer className="pt-16 relative">
            <Play playerrRef={playerRef} handleToggle={togggleMiniPlayer} />
            <Video
              status={status}
              id={id}
              title={data}
              videoRef={buttonRef}
              handleToggle={togggleMiniPlayer}
            />
            <div className="bg-white dark:bg-slate-700 p-2 flex items-center rounded-md">
              <FcPrevious
                style={{ width: "50px" }}
                onClick={handlePrevButton}
              />
              <input
                className="w-full dark:bg-slate-700"
                type="range"
                value={percentage}
              />
              <button
                onClick={percentage === 100 ? handleSubmit : handleNextButton}
                className="w-[150px] bg-green-400 px-2 py-1 rounded-md text-sm font-bold text-center"
              >
                {percentage === 100 ? "Submit" : "next question"}
              </button>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
