import React, { useState } from "react";

const Phone: React.FunctionComponent = () => {
    const [phone, setPhone] = useState<string>('');
    const [phoneError, setError] = useState<string>('');
    const [phoneDirty, setPhoneDiry] = useState<boolean>(false);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'phoneNumber':
                setPhoneDiry(true);
                break
        }
        setPhone(event.target.value);
        setError('');

    }
    const testPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputPhone = event.target.value;
        const re = /^((\+7|7|8)+([0-9]){10})$/
        if (!re.test(String(inputPhone).toLowerCase()) && inputPhone.length !== 0) {
            setError('BIG ERROR');
        } else {
            setError('');
        }
    }
    return (
        <div>
            <label htmlFor="idPhone">Phone</label>
            <input
                value={phone}
                onBlur={testPhone}
                onChange={changeHandler}
                type="text"
                name="phoneNumber"
                id="idPhone"
                placeholder="+7" />
            {(phoneDirty && phoneError) && <div style={{ color: 'red' }}>{phoneError}</div>}
        </div>

    )
}
export default Phone;