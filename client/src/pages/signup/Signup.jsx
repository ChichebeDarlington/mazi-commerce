import "./Signup.css";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContextHook } from "../../components/contextAPI/context/context";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { dispatch, userInfo } = useGlobalContextHook();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(userInfo);

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const handleSubmit = async (m) => {
    m.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password mismatch");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/shipping");
      console.log(data);
    } catch (error) {
      toast.error("All fields must be filled");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  return (
    <div className="signup-container">
      <Helmet>Sign Up</Helmet>
      <form className="signup" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label htmlFor="email">Name:</label>
          <input
            value={name}
            onChange={(m) => setName(m.target.value)}
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(m) => setEmail(m.target.value)}
            type="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={(m) => setPassword(m.target.value)}
            type="password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password:</label>
          <input
            value={confirmPassword}
            onChange={(m) => setConfirmPassword(m.target.value)}
            type="password"
            required
          />
        </div>
        <div className="btn">
          <button type="submit">Sign Up</button>
        </div>
        <div>
          Already registered?
          <Link to={`/signin?redirect=${redirect}`}> Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
