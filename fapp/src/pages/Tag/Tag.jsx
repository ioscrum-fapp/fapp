import React from "react";
import "./Tag.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TAGS_COLLECTION, DeleteTag } from "../../backend/tagLogic";
import useDocument from "../../hooks/useDocument";

export default function Tag() {
  const { id } = useParams();
  const [tag, isFinished, error] = useDocument(TAGS_COLLECTION, id);
  const navigate = useNavigate();
  const handleClick = async () => {
    await DeleteTag(id);
    navigate("/tags/");
  };

  const { description, tagColor } = tag?.data() ?? {};

  return (
    <>
      <Link to="/tags/">
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      <div className="Account">
        {error && <div>{error}</div>}
        {!isFinished && <div>Downloading account...</div>}
        {tag && <h1>Category: {description}</h1>}
        {tag && <p style={{ color: tagColor }}>Color: {tagColor}</p>}
        {tag && (
          <button type="button" className="Button" onClick={handleClick}>
            Remove
          </button>
        )}
      </div>
    </>
  );
}
