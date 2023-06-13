import React from "react";
import { Link } from "react-router-dom";
import "./TagList.css";

function CreateTag(tag) {
  const { id } = tag;
  const { description, tagColor } = tag.data();
  return (
    <div className="TagList-element" key={id}>
      <Link className="TagdetailsLink" to={`/tag/${id}`}>
        <button type="button" className="DetailsButton">
          Details
        </button>
      </Link>
      <h1 style={{ color: tagColor }}>{description}</h1>
    </div>
  );
}

export default function TagList({ tags }) {
  return <div className="TagList">{tags && tags.map(CreateTag)}</div>;
}
