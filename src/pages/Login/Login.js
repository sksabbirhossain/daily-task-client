import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userLogin, googleSignin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // login user
  const handleUserLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    userLogin(email, password)
      .then((userInfo) => {
        const user = userInfo.user;
        navigate(from, { replace: true });
        toast.success("Login successful");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        toast.error(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return "loading...";
  }

  // google signup function
  const handleGoogleSignIn = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Google SignUp successful");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" border rounded-lg py-8 px-5 shadow shadow-slate-600">
        <h3 className="text-3xl pb-5">Login</h3>
        <Form onSubmit={handleUserLogin}>
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
          <Button className="uppercase">Login</Button>
        </Form>
        <div className="">
          <p className="mt-4">
            You don't an account
            <Link to="/signup">
              {" "}
              <small className="text-green-500"> Create here</small>{" "}
            </Link>
          </p>
        </div>

        <div
          className="shadow py-3 text-center rounded mt-2 cursor-pointer bg-green-500"
          onClick={handleGoogleSignIn}
        >
          <span className="text-black-600">Login With Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
