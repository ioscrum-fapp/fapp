import { collection, getDocs, query } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../backend/firebase";

export default function useCollection(collectionName, ...queries) {
  const [docs, setDocs] = useState();
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState();

  const fetch = useCallback(async () => {
    try {
      setFinished(false);
      const q = query(collection(db, collectionName), ...queries);
      const fetchedDocs = await getDocs(q);
      setDocs(fetchedDocs);
    } catch (e) {
      setError(e);
    } finally {
      setFinished(true);
    }
  }, [collectionName, setFinished, setDocs, setError]);

  useEffect(() => {
    fetch();
  }, [collectionName, fetch]);

  return [docs, finished, error];
}
