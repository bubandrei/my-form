import React, { useState } from "react";

const Name: React.FunctionComponent = () => {
    const [name, setName] = useState<string>('');
    const [nameError, setError] = useState<string>('ERROR');
    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(event);
    }

    return (
        <div>
            <label htmlFor="idName">Name</label>
            <input
                value={name}
                onChange={changeHandler}
                type="text"
                id="idName"
                placeholder="Ivan Ivanov" />
        </div>

    )
}
export default Name;