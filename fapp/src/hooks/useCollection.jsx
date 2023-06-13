import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { AuthContext } from "../common/Auth";

export default function useCollection(collectionName, ...queries) {
  const [docs, setDocs] = useState();
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState();

  const { currentUser } = useContext(AuthContext);

  const fetch = useCallback(async () => {
    try {
      setFinished(false);
      const q = query(
        collection(db, collectionName),
        where("userId", "==", currentUser.uid),
        ...queries
      );
      const fetchedDocs = await getDocs(q);
      setDocs(fetchedDocs);
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {
      setFinished(true);
    }
  }, [
    collectionName,
    setFinished,
    setDocs,
    setError,
    JSON.stringify(queries),
    currentUser.uid,
  ]);

  useEffect(() => {
    fetch();
  }, [collectionName, fetch]);

  return [docs, finished, error];
}
