import React, { useEffect, useReducer, useState } from "react";
import { auth } from "../../firebase/firbase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation

    if (!email || !password) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be atleast 6 charachter long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // delete the user gmail from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get the user id and token and update the password to firebase
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        //populate the details to redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        //redirect
        history.push('/')
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h5>Complete Registration</h5>
              <input
                type="email"
                className="form-control "
                value={email}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control "
                value={password}
                autoFocus
                placeholder="enter password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
