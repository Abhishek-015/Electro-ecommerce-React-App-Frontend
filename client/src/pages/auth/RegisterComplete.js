import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firbase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Complete Registration</label>
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
