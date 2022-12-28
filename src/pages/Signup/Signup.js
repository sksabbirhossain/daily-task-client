import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userSignup, googleSignin } = useAuth();
  const navigate = useNavigate();

  // form handle and signup function
  const handleUserSignup = (e) => {
    setLoading(true);
    e.preventDefault();
    userSignup(email, password, username)
      .then((userInfo) => {
        const user = userInfo.user;

        // update profile
        updateProfile(user, {
          displayName: username,
        });
        setLoading(false);
        toast.success("User Create Successfull");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error.message);
        toast.error(error.message);
      });
  };

  if (loading) {
    return "loading...";
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" border rounded-lg py-8 px-5 shadow shadow-slate-600">
        <h3 className="text-3xl pb-5">Sign Up</h3>
        <Form onSubmit={handleUserSignup}>
          <FormInput
            label="User Name"
            type="text"
            placeholder="your name"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            label="password"
            type="password"
            placeholder="your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="uppercase">Sign Up</Button>
        </Form>
        <div className="flex">
          <p className="mt-4">
            You have an account
            <Link to="/login">
              <small className="text-green-500"> Login</small>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
