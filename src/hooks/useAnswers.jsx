import React, { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";

function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuary = query(answerRef, orderByKey());
      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(answerQuary);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAns) => {
            return [...prevAns, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }

    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}

export default useAnswers;
