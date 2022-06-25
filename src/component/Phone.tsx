import React, { useState } from "react";

const Phone: React.FunctionComponent = () => {
    const [phone, setPhone] = useState<string>('');
    const [phoneError, setError] = useState<string>('Error');
    const [phoneDirty, setPhoneDiry] = useState<boolean>(false);

    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {

    }
    return (
        <div>
            <label htmlFor="idPhone">Phone</label>
            <input
                value={phone}
                onChange={changeHandler}
                type="text"
                name="phoneNumber"
                id="idPhone"
                placeholder="+7" />
        </div>

    )
}
export default Phone;