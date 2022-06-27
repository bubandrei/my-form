/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "node:path/win32";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { validateLocaleAndSetLanguage } from "typescript";

const App: React.FunctionComponent = () => {
  const initForm = { userName: "", email: "", phone: "", date: "", text: "" };
  const check = {
    userName: false,
    email: false,
    phone: false,
    date: false,
    text: false
  };
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState<string>("");
  const [errorPhone, setErrorPhone] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorText, setText] = useState<string>("");
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [checkFlag, setCheckFlag] = useState(check);
  const [checkResponse, setCheckResponse] = useState<string>("");

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    switch (event.target.name) {
      case "userName":
        setNameDirty(true);
        const checkName = /^[A-Z][a-z]{2,29}\040[A-Z][a-z]{2,29}$/i;
        if (
          !checkName.test(String(event.target.value).toLowerCase()) &&
          event.target.value.length !== 0
        ) {
          setError("enter first and last name");
          setCheckFlag({ ...checkFlag, userName: false });
        } else {
          setError("");
          setCheckFlag({ ...checkFlag, userName: true });
        }
        break;
      case "email":
        setNameDirty(true);
        const checkEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
          !checkEmail.test(String(event.target.value).toLowerCase()) &&
          event.target.value.length !== 0
        ) {
          setErrorEmail("enter a valid email");
          setCheckFlag({ ...checkFlag, email: false });
        } else {
          setErrorEmail("");
          setCheckFlag({ ...checkFlag, email: true });
        }
        break;
      case "phone":
        setNameDirty(true);
        const checkPhone = /^((\+7|7|8)+([0-9]){10})$/;
        if (
          !checkPhone.test(String(event.target.value).toLowerCase()) &&
          event.target.value.length !== 0
        ) {
          setErrorPhone("enter a valid phone number");
          setCheckFlag({ ...checkFlag, phone: false });
        } else {
          setErrorPhone("");
          setCheckFlag({ ...checkFlag, phone: true });
        }
        break;
      case "text":
        setNameDirty(true);
        let message = event.target.value;
        if (message.length > 10 && message.length < 300) {
          setText("");
          setCheckFlag({ ...checkFlag, text: true });
        } else {
          setText("invalid number of characters");
          setCheckFlag({ ...checkFlag, text: false });
        }
        break;
      case "date":
        setNameDirty(true);
        setCheckFlag({ ...checkFlag, date: true });
        break;
    }
  };
  const answer = (response: any) => {
    if (response.status === 200) {
      setCheckResponse("Success");
    } else {
      setCheckResponse("Error");
    }
    setTimeout(() => {
      setCheckResponse("");
    }, 5000);
  };
  const getForm = async (url: RequestInfo) => {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error ${url}, status ${response}`);
    }
    let data = await response.json();
    answer(response);
    console.log(data);
    return data;
  };

  const sendForm = async (url: RequestInfo, form: any) => {
    const response = await fetch(url, {
      method: "POST",
      body: form
    });
    if (!response.ok) {
      throw new Error(`Error ${url}, status ${response}`);
    }
    return await response.json();
  };
  const handleHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const fullForm = JSON.stringify(form);
    if (form.userName && form.email && form.phone && form.date && form.text) {
      sendForm("https://jsonplaceholder.typicode.com/posts", fullForm)
        .then(() => {
          getForm("https://jsonplaceholder.typicode.com/posts");
        })
        .then(() => {
          setForm(initForm);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const newDate = (e: any) => {
    setCheckFlag({ ...checkFlag, date: true });
  };
  return (
    <>
      <form onSubmit={handleHandler} className="wrap">
        <div className="inputArea">
          <div className="row">
            <label htmlFor="idName">
              Name
              {nameDirty && error && (
                <span style={{ color: "red" }}> ({error})</span>
              )}
            </label>
            <input
              value={form.userName.toUpperCase()}
              onChange={changeHandler}
              name="userName"
              type="text"
              id="idName"
              placeholder="Ivan Ivanov"
            />
          </div>
          <div>
            <label htmlFor="idEmail">
              E-mail
              {nameDirty && errorEmail && (
                <span style={{ color: "red" }}> ({errorEmail})</span>
              )}
            </label>
            <input
              value={form.email}
              onChange={changeHandler}
              name="email"
              type="text"
              id="idEmail"
              placeholder="email@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="idPhone">
              Phone
              {nameDirty && errorPhone && (
                <span style={{ color: "red" }}> ({errorPhone})</span>
              )}
            </label>
            <input
              value={form.phone}
              onChange={changeHandler}
              type="text"
              name="phone"
              id="idPhone"
              placeholder="+7"
            />
          </div>
          <div>
            <label htmlFor="idDate">Date</label>
            <input
              type="date"
              name="date"
              id="idDate"
              onSelect={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="idTextarea">
              Text
              {nameDirty && errorText && (
                <span style={{ color: "red" }}> ({errorText})</span>
              )}
            </label>
            <textarea
              value={form.text}
              name="text"
              onChange={changeHandler}
              id="idTextarea"
              minLength={10}
              maxLength={300}
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div>
            <button type="submit" value="Apply">
              Apply
            </button>
          </div>
        </div>
        <div className="modal">{checkResponse}</div>
      </form>
    </>
  );
};
export default App;

// function setDate() {
//   throw new Error("Function not implemented.");
// }
