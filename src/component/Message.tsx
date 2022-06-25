import React from "react";

const Message: React.FunctionComponent = () => {
    return (
        <div>
            <textarea minLength={10} maxLength={300} cols={30} rows={10}></textarea>
        </div >

    )
}
export default Message;