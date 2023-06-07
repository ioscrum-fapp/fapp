import { doc, collection, getDoc } from "@firebase/firestore";
import { useState, useCallback, useEffect } from "react";
import { db } from "../backend/firebase";

export default function useDocument(collectionName, id) {
  const [document, setDocument] = useState();
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState();

  const fetch = useCallback(async () => {
    try {
      setFinished(false);
      const q = doc(collection(db, collectionName), id);
      const fetchedDoc = await getDoc(q);
      setDocument(fetchedDoc);
    } catch (e) {
      setError(e);
    } finally {
      setFinished(true);
    }
  }, [collectionName, setFinished, setDocument, setError]);

  useEffect(() => {
    fetch();
  }, [collectionName, fetch]);

  return [document, finished, error];
}
