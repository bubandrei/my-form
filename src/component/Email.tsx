import React, { useState } from "react";

const Email: React.FunctionComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setError] = useState<string>('');
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'email':
                setEmailDirty(true);
                break
        }
        setEmail(event.target.value);
        setError('');

    }
    const checkEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setError('BIG ERROR');
        } else {
            setError('');
        }
    }
    return (
        <div>
            <label htmlFor="idEmail">E-mail</label>
            <input
                value={email}
                onBlur={checkEmail}
                onChange={changeHandler}
                name='email'
                type="text"
                id="idEmail"
                placeholder="email@gmail.com" />
            {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        </div>

    )
}
export default Email;