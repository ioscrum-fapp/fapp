import { useState, useEffect } from "react";

const useFetchJson = (url) => {
  const [json, setJson] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw Error("response not ok!");
        }
        return await res.json();
      })
      .then((result) => {
        setIsFinished(true);
        setJson(result);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setIsFinished(true);
          setError(err.message);
          console.warn(err);
        }
      });

    // abort the fetch
    return () => {
      abortCont.abort();
    };
  }, [url]);

  // console.warn(json)

  return { json, isFinished, error };
};

export default useFetchJson;
