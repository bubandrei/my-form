import React, { useState } from "react";

export interface IForm {
  userName: string;
  email: string;
  phone: string;
  date: string;
  text: string;
}

const App: React.FunctionComponent = () => {
  const initForm: IForm = { userName: "", email: "", phone: "", date: "", text: "" };

  const [form, setForm] = useState(initForm);
  const [error, setError] = useState<string>("");
  const [errorPhone, setErrorPhone] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorText, setText] = useState<string>("");
  const [checkResponse, setCheckResponse] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    switch (event.target.name) {
      case "userName":
        const checkName = /^[A-Z][a-z]{2,29}\040[A-Z][a-z]{2,29}$/i;
        if (
          !checkName.test(String(event.target.value).toLowerCase()) &&
          event.target.value.length !== 0
        ) {
          setError("enter first and last name");
        } else {
          setError("");
        }
        break;
      case "email":
        const checkEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
          !checkEmail.test(String(event.target.value).toLowerCase()) &&
          event.target.value.length !== 0
        ) {
          setErrorEmail("enter a valid email");
        } else {
          setErrorEmail("");
        }
        break;
      case "phone":
        const checkPhone = /^((\+7|7|8)+([0-9]){10})$/;
        if (
          !checkPhone.test(event.target.value) &&
          event.target.value.length !== 0
        ) {
          setErrorPhone("enter a valid phone number");
        } else {
          setErrorPhone("");
        }
        break;
      case "text":
        if (event.target.value.length > 10 && event.target.value.length < 300) {
          setText("");
        } else {
          setText("invalid number of characters");
        }
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
    }, 3000);
  };
  const getForm = async (url: RequestInfo):Promise<any> => {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error ${url}, status ${response}`);
    }
    let data = await response.json();
    answer(response);
    setDisable(false);
    return data;
  };

  const sendForm = async (url: RequestInfo, form: any):Promise<any> => {
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
          setDisable(true);
        })
        .then(() => {
          setForm(initForm);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleHandler} className="wrap">
        <div className="inputArea">
          <div>
            <label htmlFor="idName">
              Name
              {error && (<span style={{ color: "red" }}> ({error})</span>)}
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
              {errorEmail && (<span style={{ color: "red" }}> ({errorEmail})</span>)}
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
              {errorPhone && (<span style={{ color: "red" }}> ({errorPhone})</span>)}
            </label>
            <input
              value={form.phone}
              onChange={changeHandler}
              type="number"
              name="phone"
              id="idPhone"
              placeholder="+7 123 4456 789"
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
              {errorText && (<span style={{ color: "red" }}> ({errorText})</span>)}
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
            <button type="submit" disabled={disable}>
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

