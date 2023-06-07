import { v4 as uuid } from "uuid";

const accountsRoute = "/accounts/";
const BACKEND_URL = "http://localhost:3030/accounts/";

export const ACCOUNTS_COLLECTION = "accounts";

export async function CreateNewAccount(navigate, userId, name, balance) {
  const newUuid = uuid();
  const account = {
    id: newUuid,
    user_id: userId,
    name,
    balance,
  };

  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  }).then(() => {
    navigate(accountsRoute + newUuid);
  });
}

export async function DeleteAccount(accountId) {
  return fetch(BACKEND_URL + accountId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
