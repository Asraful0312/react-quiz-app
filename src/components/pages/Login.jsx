import Ilustration from "../Ilustration";
import LoginInput from "../LoginInput";

export default function Login() {
  return (
    <>
      <h1 className="font-bold text-2xl dark:text-gray-200">
        Login To Your Account
      </h1>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 justify-between mt-5">
        <Ilustration />
        <LoginInput />
      </div>
    </>
  );
}
