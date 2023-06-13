import { Timestamp } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { DateTimeToJsFormat } from "../../backend/dateTimeLogic";
import {
  CreateNewExpense,
  EXPENSES_COLLECTION,
  EditExpense,
  saveFile
} from "../../backend/expenseLogic";

import { AuthContext } from "../../common/Auth";
import useCollection from "../../hooks/useCollection";
import { ACCOUNTS_COLLECTION } from "../../backend/accountsLogic";
import { TAGS_COLLECTION } from "../../backend/tagLogic";
import useDocument from "../../hooks/useDocument";
import "./CreateExpense.css";

export default function CreateExpense() {
  const { id } = useParams();
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(DateTimeToJsFormat(new Date()));
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const [selectedTags, setSelectedTags] = useState([]);

  /*
  to show client the file he uploaded
  */
  const [image, setImage] = useState(null);
  const [file,setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const [tags] = useCollection(TAGS_COLLECTION);
  const [accounts, ,] = useCollection(ACCOUNTS_COLLECTION);
  const [expense, ,] = useDocument(EXPENSES_COLLECTION, id);

  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await EditExpense(
        currentUser.uid,
        value,
        date,
        selectedTags.map((elem) => elem.value),
        selectedAccount,
        id,
        false
      );
      navigate(`/expenses/${id}`);
    } else {
      const newId = await CreateNewExpense(
        currentUser.uid,
        value,
        date,
        selectedTags.map((elem) => elem.value),
        selectedAccount,
        false
      );
      try{
        await saveFile(file,newId,currentUser.uid);
      }catch{
        alert("error in saving file to cloud");
      }
      navigate(`/expenses/${newId}`);
    }
  };
  const loadImage = (imageToLoad) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(imageToLoad);
  };

  const handleDrag = (event) => {
    event.preventDefault();
  };
 
  const handleDrop = (event) => {
    event.preventDefault();
    const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (acceptedFileTypes.includes(event.dataTransfer.files[0].type)) {
      setFile(event.dataTransfer.files[0])
      setIsDragging(true);
      loadImage(event.dataTransfer.files[0]);
    } else alert("The type of file is not acceptable");
  };

  const handleCancel = () => {
    setImage(null);
    setFile(null)
    setIsDragging(false);
  };

  const handleInput = (event) => {
    setIsDragging(true);
    setFile(event.target.files[0])
    loadImage(event.target.files[0]);
  };
  
  const accountsList = accounts?.docs;
  useEffect(() => {
    if (accountsList && !selectedAccount) {
      setSelectedAccount(accountsList[0].id);
    }
  }, [JSON.stringify(accountsList)]);

  const tagList = tags?.docs;

  useEffect(() => {
    if (tagList && selectedTags.length !== 0) {
      setSelectedTags([]);
    }
  }, [JSON.stringify(tagList)]);

  let options;
  if (tagList) {
    options = tagList.map((tag) => ({
      value: tag.id,
      label: tag.data().description,
    }));
  }

  const expenseJson = expense?.data();
  useEffect(() => {
    if (expenseJson && !value) {
      const { seconds, nanoseconds } = expenseJson.date;
      setValue(expenseJson.value);
      setDate(DateTimeToJsFormat(new Timestamp(seconds, nanoseconds).toDate()));
      setSelectedAccount(expenseJson.accountId);
    }
  }, [JSON.stringify(expenseJson)]);

  return (
    <>
      <Link to={id ? `/expenses/${id}` : "/expenses"}>
        <button type="button" className="Button">
          Go back
        </button>
      </Link>
      <div className="CreateExpense">
        <h1> {id ? "Edit expense" : "Add new expense"} </h1>
        <form onSubmit={handleSubmit} className="AddingForm">
          <div className="formControl">
            <label> Value: </label>
            <input
              required
              type="number"
              step="0.01"
              value={value}
              min="0"
              onChange={(e) => parseFloat(setValue(e.target.value))}
            />
          </div>
          <div className="formControl">
            <label> Date: </label>
            <input
              required
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="formControl">
            <label> Account: </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {accountsList?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.data().name}
                </option>
              ))}
            </select>
          </div>
          <div className="formControl">
            <label>Category:</label>

            {tagList === null ? (
              <div>Loading tags...</div>
            ) : (
              <Select
                defaultValue={[]}
                isMulti
                options={options}
                onChange={(item) => {
                  setSelectedTags(item);
                }}
                className="select"
                isClearable
                isSearchable
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
              />
            )}
          </div>

          {/*
              it has to have a drag and drop otherwise it does not work
              */}
          {isDragging ? (
            <div className="imageContainer">
              <h3>Your attached file</h3>
              <img
                src={image}
                alt="error file not readable"
                className="dragImage"
              />
              <button
                type="button"
                className="cancelButton"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              className="dropzone"
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <h2>Drag file here only JPEG, JPG and PNG are allowed</h2>
              <h3>Or</h3>
              <input
                type="file"
                onChange={handleInput}
                accept="image/png, image/jpeg, image/jpg"
                className="imageInput"
              />
            </div>
          )}
          <div className="formControl">
            <button type="submit" className="submitButton">
              {id ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
