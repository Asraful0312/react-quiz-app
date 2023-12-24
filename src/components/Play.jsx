import image from "../assets/img/play.png";

export default function Play({ handleToggle, playerrRef }) {
  return (
    <div
      ref={playerrRef}
      onClick={handleToggle}
      className="flex justify-end absolute bottom-10 right-3"
    >
      <div className="flex w-10 h-10 rounded-full items-center justify-center bg-black">
        <img className="" width="20px" height="20px" src={image} alt="" />
      </div>
    </div>
  );
}
