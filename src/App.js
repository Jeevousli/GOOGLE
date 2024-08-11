import { useEffect, useState } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";
function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:", +response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "497645591751-qpup47g5dj5nvt1hb086e2ljfmsdli0i.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  // if we have no user : sign in
  // if we have show logout
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name} </h3>
          <h4>{user.email}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
