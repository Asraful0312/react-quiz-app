import Ilustration from "../Ilustration";
import Form from "../Form";

export default function Signup() {
  return (
    <>
      <h1 className="font-bold text-2xl dark:text-gray-200">
        SignUp In To Your Account
      </h1>
      <div className="flex gap-16 justify-between mt-5">
        <Ilustration />
        <Form />
      </div>
    </>
  );
}
