import * as React from "react";
import * as ReactDOM from "react-dom";
import { FirebaseContext, FirebaseProvider, initialState, reducerFunction } from './fb/appState';
import { app } from './fb/bootstrap';
import './styles/styles.scss';
import 'bootstrap';

const AuthTest = () => {
  const FB = React.useContext(FirebaseContext);
  return <button className={"bg-red bg-danger"} onClick={() => app.auth().signInWithEmailAndPassword('shag91607@gmail.com', 'p@ssword!')}>Click</button>
}
const LogoutTest = () => {
  const FB = React.useContext(FirebaseContext);
  return <button onClick={() => app.auth().signOut()}>Logout</button>
}

const ApplicationRoot = () => {
  return <FirebaseProvider initialState={initialState} reducer={reducerFunction}>
    <React.Fragment>
      <div>Replaced Component</div>;
      <AuthTest />
      <LogoutTest />
    </React.Fragment>
  </FirebaseProvider>
};

ReactDOM.render(<ApplicationRoot />, document.getElementById("appRoot"));
