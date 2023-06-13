import { addDoc, collection, deleteDoc, doc } from "@firebase/firestore";
import { db } from "./firebase";

export const ACCOUNTS_COLLECTION = "accounts";

export async function CreateNewAccount(userId, name, balance) {
  const account = {
    userId,
    name,
    balance,
  };

  const ref = await addDoc(collection(db, ACCOUNTS_COLLECTION), account);
  return ref.id;
}

export async function EditAccountBalance(accountId, diff){
  const
}

export async function DeleteAccount(accountId) {
  await deleteDoc(doc(db, ACCOUNTS_COLLECTION, accountId));
}
