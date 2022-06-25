import React from "react";
import Email from "./component/Email";
import Message from "./component/Message";
import Name from "./component/Name";
import Phone from "./component/Phone";
import Submit from "./component/Submit";
import Date from "./component/Date";

const App: React.FunctionComponent = () => {
  return (
    <form>
      <Name></Name>
      <Email />
      <Phone />
      <Date/>
      <Message />
      <Submit/>
    </form>
  )
}
export default App;