import { useLocation, useParams } from "react-router-dom";
import Analysis from "../Analysis";
import useAnswers from "../../hooks/useAnswers";
import { isEqual } from "lodash";
import Answers from "../Answers";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const { error, loading, answers } = useAnswers(id);

  //calculate score
  const calculate = () => {
    let score = 0;

    answers.forEach((qustion, index1) => {
      let correctIndex = [];
      let checkedIndex = [];

      qustion.options.forEach((option, index2) => {
        if (option.correct) correctIndex.push(index2);
        if (data[index1].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });
      if (isEqual(correctIndex, checkedIndex)) {
        score += 5;
      }
    });

    return score;
  };

  const userScore = calculate();

  return (
    <>
      {loading && <h1 className="dark:text-gray-200 h-screen">Loading...</h1>}
      {error && (
        <h1 className="dark:text-gray-200 h-screen">There was an Error!</h1>
      )}
      {answers && answers.length > 0 && (
        <>
          <Analysis score={userScore} noq={answers.length * 5} />
          {answers.map((answer, index) => (
            <>
              <h1 className="font-bold text-2xl dark:text-gray-200">
                {answer.title}
              </h1>
              <p className="text-sm font-semibold dark:text-gray-200 pb-1 mt-2 text-gray-500 border-b border-gray-300">
                Qustions can have multiple answers
              </p>
              <Answers input={false} options={answer.options} />
            </>
          ))}
        </>
      )}
    </>
  );
}
