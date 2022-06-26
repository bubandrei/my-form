import React, { useState } from "react";

const Name: React.FunctionComponent = () => {
    const [name, setName] = useState<string>('');
    const [nameError, setError] = useState<string>('');
    const [nameDirty, setNameDirty] = useState<boolean>(false);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name.toUpperCase()) {
            case 'inputName':
                setNameDirty(true);
                break
        }
        setName(event.target.value);
        console.log(event);
    }
    const checkName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[A-Z][a-z]{2,29}\040[A-Z][a-z]{2,29}$/i;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setError('BIG ERROR');
        } else {
            setError('');
        }
    }

    return (
        <div>
            <label htmlFor="idName">Name</label>
            <input
                value={name}
                onBlur={checkName}
                onChange={changeHandler}
                name='inputName'
                type="text"
                id="idName"
                placeholder="Ivan Ivanov" />
                {(nameDirty && nameError) && <div style={{ color: 'red' }}>{nameError}</div>}
        </div>

    )
}
export default Name;