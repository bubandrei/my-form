/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";


const App: React.FunctionComponent = () => {
  const initForm = { userName: '', email: '', phone: '', date: '', text: '' };
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState<string>('')
  const [errorPhone, setErrorPhone] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [nameDirty, setNameDirty] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value })

    switch (event.target.name) {
      case 'userName':
        setNameDirty(true);
        const checkName = /^[A-Z][a-z]{2,29}\040[A-Z][a-z]{2,29}$/i;
        if (!checkName.test(String(event.target.value).toLowerCase()) && event.target.value.length !== 0) {
          setError('enter first and last name');
        } else {
          setError('');
        }
        break
      case 'email':
        setNameDirty(true);
        const checkEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!checkEmail.test(String(event.target.value).toLowerCase()) && event.target.value.length !== 0) {
          setErrorEmail('enter a valid email');
        } else {
          setErrorEmail('');
        }
        break
      case 'phone':
        setNameDirty(true);
        const checkPhone = /^((\+7|7|8)+([0-9]){10})$/
        if (!checkPhone.test(String(event.target.value).toLowerCase()) && event.target.value.length !== 0) {
           setErrorPhone('enter a valid phone number');
        } else {
          setErrorPhone('');
        }
        break
    }


  }
  const handleHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(e)
  }
  return (
    <>
      <pre>{JSON.stringify(form, undefined, 2)}</pre>
      <form onSubmit={handleHandler}>
        <div>
          <label htmlFor="idName">Name</label>
          <input
            value={form.userName.toUpperCase()}
            onChange={changeHandler}
            name='userName'
            type="text"
            id="idName"
            placeholder="Ivan Ivanov" />
          {(nameDirty && error) && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div>
          <label htmlFor="idEmail">E-mail</label>
          <input
            value={form.email}
            onChange={changeHandler}
            name='email'
            type="text"
            id="idEmail"
            placeholder="email@gmail.com" />
          {(nameDirty && errorEmail) && <div style={{ color: 'red' }}>{errorEmail}</div>}
        </div>
        <div>
          <label htmlFor="idPhone">Phone</label>
          <input
            value={form.phone}
            onChange={changeHandler}
            type="text"
            name="phone"
            id="idPhone"
            placeholder="+7" />
          {(nameDirty && errorPhone) && <div style={{ color: 'red' }}>{errorPhone}</div>}
        </div>
        <div>
          <label htmlFor="">Date</label>
          <input type="date" name="" id="" />
        </div>
        <div>
          <textarea minLength={10} maxLength={300} cols={30} rows={10}></textarea>
        </div >
        <div>
          <button type="submit" value="Apply">Apply</button>
        </div>
      </form>
    </>
  )
}
export default App;