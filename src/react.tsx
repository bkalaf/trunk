import * as React from "react";
import * as ReactDOM from "react-dom";

const FirebaseContext = React.createContext(null);

const ApplicationRoot = () => {
  return <div>Replaced Component</div>;
};

ReactDOM.render(<ApplicationRoot />, document.getElementById("appRoot"));
