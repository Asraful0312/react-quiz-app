import InputText from "./InputText";
import CheckBox from "./CheckBox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Form() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isValid, setIsValid] = useState(true);
  const navigator = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Wrong Password");
    }

    try {
      setError(false);
      setLoading(false);
      await signup(email, password, userName);
      navigator("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const rexForEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validity = emailRegex.test(input);
    setIsValid(validity);
  };

  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    rexForEmail(inputValue);
  };

  return (
    <form className="w-[50%]" onSubmit={handleSignup}>
      <InputText
        margin={"mb-5"}
        type="text"
        required
        placeholder="Enter Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="outline-none dark:focus:text-gray-50 dark:bg-slate-700 border-white w-full py-2 px-3 bg-white"
      />
      {!isValid ? (
        <p className="text-sm" style={{ color: "red" }}>
          Please Use a Valid Email!
        </p>
      ) : null}
      <InputText
        margin={"mb-5"}
        type="text"
        required
        value={email}
        onChange={handleEmail}
        placeholder="Enter Your Email"
        className="outline-none dark:focus:text-gray-50 relative dark:bg-slate-700 border-white w-full py-2 px-3 bg-white"
      />

      <InputText
        margin={"mb-5"}
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        className="outline-none dark:focus:text-gray-50 dark:bg-slate-700 relative border-white w-full py-2 px-3 bg-white"
      />
      <InputText
        margin={"mb-5"}
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="outline-none dark:focus:text-gray-50 relative dark:bg-slate-700 border-white w-full py-2 px-3 bg-white"
      />
      {error && (
        <p className="text-sm text-red-500">Failed to Create Account!</p>
      )}
      <CheckBox
        className="dark:text-gary-200"
        type="checkbox"
        id="terms"
        value={agree}
        required
        onChange={(e) => setAgree(e.target.value)}
        text="I agree to the terms & comditions"
      />
      <InputText
        disabled={loading}
        margin={"mb-5"}
        required
        className="bg-green-400 font-bold text-sm rounded-md transition-all duration-200 hover:bg-green-300 py-3 w-full mt-5"
        type="submit"
        value="Submit"
      />
      <h1 className="text-center mt-4 text-sm font-semibold dark:text-gray-200">
        Already have a Account?
        <Link className="text-sm mx-1 font-semibold text-blue-500" to="/login">
          {" "}
          Login{" "}
        </Link>
        Instend
      </h1>
    </form>
  );
}
