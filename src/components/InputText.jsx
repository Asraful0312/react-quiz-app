export default function InputText({ margin, ...rest }) {
  return (
    <div className={`${margin}`}>
      <input {...rest} />
    </div>
  );
}
