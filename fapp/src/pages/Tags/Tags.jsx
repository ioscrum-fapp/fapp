import React from "react";
import { Link } from "react-router-dom";
import TagList from "../TagList/TagList";
import useCollection from "../../hooks/useCollection";
import "./Tags.css";
import { TAGS_COLLECTION } from "../../backend/tagLogic";

export default function Tags() {
  const [tags, isFinished, error] = useCollection(TAGS_COLLECTION);

  return (
    <div className="Tags">
      <div className="AddDiv">
        <Link className="AddLink" to="/tag/add">
          <button type="button" className="AddButton">
            Add new category
          </button>
        </Link>
      </div>
      {error && <div>{error}</div>}
      {!isFinished && <div>Downloading categories...</div>}
      {tags && <TagList tags={tags.docs} />}
    </div>
  );
}
