import InputText from "./InputText";
import CheckBox from "./CheckBox";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import ErrorField from "./ErrorField";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const { login } = useAuth();

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(false);
      setError("");
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to Login!");
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
    <form className="md:w-[50%] w-full" onSubmit={loginSubmit}>
      {!isValid && (
        <p className="text-sm" style={{ color: "red" }}>
          Please Use a Valid Email!
        </p>
      )}
      <InputText
        required
        margin={"mb-5"}
        type="text"
        onChange={handleEmail}
        value={email}
        placeholder="Enter Your Email"
        className="outline-none relative dark:bg-slate-700 dark:focus:text-gray-50 border-white w-full py-2 px-3 bg-white"
      />
      <InputText
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        className="outline-none relative dark:bg-slate-700 dark:focus:text-gray-50 border-white w-full py-2 px-3 bg-white"
      />

      <CheckBox
        required
        type="checkbox"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
        id="terms"
        text="I agree to the terms & comditions"
      />

      <InputText
        disabled={loading}
        className="bg-green-400 font-bold text-sm rounded-md transition-all duration-200 hover:bg-green-300 py-3 w-full mt-5"
        type="submit"
        value="Submit"
      />
      {error && <ErrorField text={error} />}
      <h1 className="text-center mt-4 text-sm font-semibold dark:text-gray-200">
        Dont have a Account?
        <Link className="text-sm mx-1 font-semibold text-blue-500" to="/signup">
          {" "}
          SignUp{" "}
        </Link>
        Instend
      </h1>
    </form>
  );
}
