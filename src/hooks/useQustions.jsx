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

function useQustions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qustion, setQustions] = useState([]);

  useEffect(() => {
    async function fetchQustion() {
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuary = query(quizRef, orderByKey());
      try {
        setError(false);
        const snapshot = await get(quizQuary);
        setLoading(false);
        if (snapshot.exists()) {
          setQustions((prevQustions) => {
            return [...prevQustions, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    }

    fetchQustion();
  }, [videoID]);

  return {
    loading,
    error,
    qustion,
  };
}

export default useQustions;
