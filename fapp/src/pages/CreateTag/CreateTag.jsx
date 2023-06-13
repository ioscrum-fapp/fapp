import React, { useContext, useState } from "react";
import { ChromePicker } from "react-color";
import { Link, useNavigate } from "react-router-dom";
import { CreateNewTag } from "../../backend/tagLogic";
import "./CreateTag.css";
import { AuthContext } from "../../common/Auth";

export default function CreateTag() {
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = await CreateNewTag(currentUser.uid, description, color);
    navigate(`/tag/${newId}`);
  };

  return (
    <div className="CreateTag">
      <h1> Add new category </h1>
      <div className="GoBackButton">
        <Link to="/tags">
          <button type="button" className="Button">
            Go back
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="AddingForm">
        <div className="formControl">
          <label> Description: </label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formControl">
          <p style={{ color }}>Choose category color</p>
          <ChromePicker
            color={color}
            className="formControl"
            onChange={handleColorChange}
          />
        </div>
        <div className="formControl">
          <button type="submit" className="submitButton">
            {" "}
            Create{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
