import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "./firebase";

export const TAGS_COLLECTION = "tags";

export const CreateNewTag = async (userId, description, tagColor) => {
  const newTag = {
    userId,
    description,
    tagColor,
  };

  const ref = await addDoc(collection(db, TAGS_COLLECTION), newTag);

  return ref.id;
};

export const editTag = async (tagId, userId, description, tagColor) => {
  const editedTag = {
    userId,
    description,
    tagColor,
  };

  await updateDoc(doc(db, TAGS_COLLECTION, tagId), editedTag);
};

export const DeleteTag = async (tagId) => {
  await deleteDoc(doc(db, TAGS_COLLECTION, tagId));
};
