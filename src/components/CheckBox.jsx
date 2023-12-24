export default function CheckBox(props) {
  const { text, ...rest } = props;

  return (
    <label className="dark:text-gray-50">
      <input {...rest} />
      {text}
    </label>
  );
}
