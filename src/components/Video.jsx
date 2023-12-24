import ReactPlayer from "react-player";

export default function Video({ handleToggle, videoRef, title, id, status }) {
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div ref={videoRef} className="hidden">
      <div className="absolute pr-2 dark:bg-slate-600 bg-white w-[240px] h-[200px] flex justify-end bottom-14 right-10">
        <div>
          <h1
            onClick={handleToggle}
            className="text-end cursor-pointer dark:text-gray-200 text-xl"
          >
            ×
          </h1>
          <div className="w-[220px]">
            <ReactPlayer
              url={videoUrl}
              playing={status}
              width={"100%"}
              height={"120px"}
              controls
            />
            <h1 className="cursor-pointer dark:text-gray-200 text-sm font-semibold">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
