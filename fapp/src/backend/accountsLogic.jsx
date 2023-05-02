import { v4 as uuid } from "uuid";

const accountsRoute = "/accounts/";
const url = "http://localhost:3030/accounts/";

export default function CreateNewAccount(navigate, userId, name, balance) {
  const newUuid = uuid();
  const account = {
    id: newUuid,
    user_id: userId,
    name,
    balance,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  }).then(() => {
    navigate(accountsRoute + newUuid);
  });
}
