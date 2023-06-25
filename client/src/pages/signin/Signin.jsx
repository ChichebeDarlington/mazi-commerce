import "./Signin.css";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContextHook } from "../../components/contextAPI/context/context";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const { dispatch, userInfo } = useGlobalContextHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(userInfo);

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const handleSubmit = async (m) => {
    m.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        }
      );
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      console.log(data);
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  return (
    <div className="signin-container">
      <Helmet>Sign In</Helmet>
      <form className="signin" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(m) => setEmail(m.target.value)}
            type="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(m) => setPassword(m.target.value)}
            type="password"
            required
          />
        </div>
        <div className="btn">
          <button type="submit">Sign in</button>
        </div>
        <div>
          Not registered?
          <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
