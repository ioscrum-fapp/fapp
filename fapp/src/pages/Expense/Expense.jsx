import { Timestamp } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DateTimeToHumanReadableFormatDateTime from "../../backend/dateTimeLogic";
import { DeleteExpense, EXPENSES_COLLECTION, deleteFile, loadFile } from "../../backend/expenseLogic";
import { TAGS_COLLECTION } from "../../backend/tagLogic";
import { AuthContext } from "../../common/Auth";
import useDocument from "../../hooks/useDocument";
import "./Expense.css";

const currency = "$";

function CreateTag({ tagId }) {
  const [tag] = useDocument(TAGS_COLLECTION, tagId);

  if (!tag) {
    return <p>Loading tag...</p>;
  }

  return (
    <p style={{ color: tag.data()?.tagColor }} key={tag.id}>
      {tag.data()?.description}
    </p>
  );
}

export default function Expense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, isFinished, error] = useDocument(EXPENSES_COLLECTION, id);
  const tagIdList = expense?.data()?.tags;
  const { currentUser } = useContext(AuthContext);
  const [image,setImage] = useState(null);

  const handleClick = async () => {
    await DeleteExpense(id);
    await deleteFile(currentUser.uid,id);
    navigate("/expenses");
  };

  const handleClickEdit = async () => {
    await loadFile(currentUser.uid,id);
    navigate(`/expenses/${id}/edit`);
  };

  const data = expense?.data();
  const timestamp = data
    ? new Timestamp(data.date.seconds, data.date.nanoseconds)
    : undefined;

    useEffect(() => {
      const fetchImage = async () => {
        const downloadURL = await loadFile(currentUser.uid, id);
        setImage(downloadURL);
      };
      fetchImage();
    }, []);
  return (
    <>
      {data && (
        <Link to="/expenses/">
          <button type="button" className="Button">
            Go back
          </button>
        </Link>
      )}
      <div className="Account">
        {error && <div>{error}</div>}
        {!isFinished && <div>Downloading account...</div>}

        {data && (
          <h1>
            {currency} {data.value}
          </h1>
        )}
        {data && (
          <h2>{DateTimeToHumanReadableFormatDateTime(timestamp.toDate())}</h2>
        )}
        {image && (
        <div className="imageContainer">
          <h3>Your image:</h3>
          <img className="detailsImage" alt="noPhoto" src={image}/>
        </div>)}
        <p> Categories:</p>
        {tagIdList && tagIdList.map((tag) => <CreateTag tagId={tag} />)}
        <button className="Button" type="button" onClick={handleClickEdit}>
          Edit
        </button>
        <button className="Button" type="button" onClick={handleClick}>
          Remove
        </button>
      </div>
    </>
  );
}
