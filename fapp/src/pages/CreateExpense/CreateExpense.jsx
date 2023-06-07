import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DateTimeToJsFormat } from "../../backend/dateTimeLogic";
import {
  CreateNewExpense,
  EXPENSES_COLLECTION,
  EditExpense,
} from "../../backend/expenseLogic";
import "./CreateExpense.css";
import useCollection from "../../hooks/useCollection";
import { ACCOUNTS_COLLECTION } from "../../backend/accountsLogic";
import useDocument from "../../hooks/useDocument";
import { Timestamp } from "@firebase/firestore";

const userId = 1;

export default function CreateExpense() {
  const { id } = useParams();
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(DateTimeToJsFormat(new Date()));
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const [file, setFile] = useState(null);
  /*
  to show client the file he uploaded
  */
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const [accounts,,] =
    useCollection(ACCOUNTS_COLLECTION);
  const [expense,,] = id
    ? useDocument(EXPENSES_COLLECTION, id)
    : [undefined, true, undefined];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // tags are temporary an empty list TODO change that

    if (id) {
      await EditExpense(userId, value, date, [], selectedAccount, id, false);
      navigate(`/expenses/${id}`);
    } else {
      const newId = await CreateNewExpense(
        userId,
        value,
        date,
        [],
        selectedAccount,
        false
      );
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
      setFile(event.dataTransfer.files[0]);
      setIsDragging(true);
      loadImage(event.dataTransfer.files[0]);
    } else alert("The type of file is not acceptable");
  };
  const handleCancel = () => {
    setFile(null);
    setImage(null);
    setIsDragging(false);
  };
  const handleInput = (event) => {
    setFile(event.target.files[0]);
    setIsDragging(true);
    loadImage(event.target.files[0]);
  };

  const accountsList = accounts?.docs;
  useEffect(() => {
    if (accountsList && !selectedAccount) {
      setSelectedAccount(accountsList[0].id);
    }
  }, [JSON.stringify(accountsList)]);

  const expenseJson = expense?.data();
  useEffect(() => {
    if (expenseJson && !value) {
      const {seconds, nanoseconds} = expenseJson.date
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
