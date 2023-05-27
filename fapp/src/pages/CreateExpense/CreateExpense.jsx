import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DateTimeToJsFormat } from "../../backend/dateTimeLogic";
import { CreateNewExpense, EditExpense } from "../../backend/expenseLogic";
import useFetch from "../../hooks/useFetch";
import "./CreateExpense.css";

const userId = 1;
const url = "http://localhost:3030/accounts?user_id=";

export default function CreateExpense() {
  const {id} = useParams();
  const [value, setValue] = useState(undefined);
  const [date, setDate] = useState(DateTimeToJsFormat(new Date()));
  const [selectedAccount, setSelectedAccount] = useState(undefined);
  const [file,setFile] = useState(null);
  /*
  to show client the file he uploaded
  */
  const [image,setImage] = useState(null);
  const [isDragging,setIsDragging] = useState(false);
  const navigate = useNavigate();
  

  const accountUrl = url + userId;
  const {
    json: accountsJson,
    isFinished: accountsIsFinished,
    error: accountsError,
  } = useFetch(accountUrl);
  const {
    json: expenseJson,
    isFinished: expenseIsFinished,
    error: expenseError
  } = id ? useFetch(`http://localhost:3030/expenses/${id}`) : {json:null, isFinished:true, error:null};

  const handleSubmit = (e) => {
    e.preventDefault();
    // tags are temporary an empty list TODO change that

    if (id)
      EditExpense(navigate, userId, value, date, [], selectedAccount, id);
    else
      CreateNewExpense(navigate, userId, value, date, [], selectedAccount);
  };
 
  const loadImage = (imageToLoad) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(imageToLoad);
  }
  const handleDrag = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if(acceptedFileTypes.includes(event.dataTransfer.files[0].type))
    {
      setFile(event.dataTransfer.files[0]);
      setIsDragging(true);
      loadImage(event.dataTransfer.files[0]);
    }
    else
      alert("The type of file is not acceptable");
  }
  const handleCancel = () =>{
    setFile(null);
    setImage(null);
    setIsDragging(false);
  }
  const handleInput = (event)=>{
    setFile(event.target.files[0])
    setIsDragging(true);
    loadImage(event.target.files[0]);
  }
  
  useEffect(() => {
    [accountsJson];
    if (accountsJson && !selectedAccount) {
      setSelectedAccount(accountsJson[0].id);
    }
  });

  useEffect( () => {
    [expenseJson];
    if (expenseJson && !value) {
      setValue(expenseJson.value);
      setDate(DateTimeToJsFormat(new Date(expenseJson.date)));
      setSelectedAccount(expenseJson.accountId);
    }
  });

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
                  onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="formControl">
              <label> Date: </label>
              <input
                  required
                  type="datetime-local"
                  value={date}
                  onChange={(e) => {setDate(e.target.value);}}
              />
            </div>
            <div className="formControl">
              <label> Account: </label>
              <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
              >
                {accountsJson?.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                ))}
              </select>
            </div>
            {
              /*
              it has to have a drag and drop otherwise it does not work
              */
            }
            {
              isDragging ? (
                <div className="imageContainer">
                  <h3>Your attached file</h3>
                  <img src={image} alt="error file not readable" className="dragImage"/>
                  <button type='button' className="cancelButton" onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div className="dropzone" onDragOver={handleDrag} onDrop={handleDrop}>
                  <h2>Drag file here only JPEG, JPG and PNG are allowed</h2>
                  <h3>Or</h3>
                  <input type="file" 
                  onChange={handleInput}
                  accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              )
            }
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
