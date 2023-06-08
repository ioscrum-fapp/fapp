import { v4 as uuid } from "uuid";

const tagRoute = "/tags/";
const BACKEND_URL = "http://localhost:3030/tags/";

export const CreateNewTag = async (navigate, userId, tag, color) => {
  const newUuid = uuid();
  const newTag = {
    id: newUuid,
    user_id: userId,
    description: tag,
    tag_color: color,
  };

  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTag),
  }).then(() => {
    navigate(tagRoute + newUuid);
  });
};

export const editTag = async (navigate, tagId, userId, tag, color) => {
  const editedTag = {
    id: tagId,
    user_id: userId,
    description: tag,
    tag_color: color,
  };

  fetch(BACKEND_URL + tagId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedTag),
  }).then(() => {
    navigate(tagRoute + tagId);
  });
};

export const DeleteTag = async (tagId) => {
  fetch(BACKEND_URL + tagId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};
