import React, { useEffect, useReducer, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase/firbase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleSubmit = async (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <h5>Login</h5>
              )}
              <input
                type="email"
                className="form-control "
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control "
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="primary"
              shape="round"
              className="mb-3"
              block
              size="large"
              icon={<MailOutlined />}
              disabled={!email || password.length < 6}
            >
              Login with Email and Password
            </Button>
            <Button
              onClick={googleSubmit}
              type="danger"
              shape="round"
              className="mb-3"
              icon={<GoogleOutlined />}
              block
              size="large"
            >
              Login with Google
            </Button>
            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
