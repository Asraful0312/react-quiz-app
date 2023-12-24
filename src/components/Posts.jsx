import Post from "./Post";
import useVideoList from "../hooks/useVideoList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import image from "../assets/loading.gif";

export default function Posts() {
  const [page, setPage] = useState(1);
  const { loading, error, vidoes, hasMore } = useVideoList(page);

  return (
    <div className="dark:bg-slate-800">
      {vidoes.length > 0 && (
        <InfiniteScroll
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-7"
          dataLength={vidoes.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          loader={
            <h1 className="text-center dark:text-gray-200">Loading...</h1>
          }
          endMessage={<h1 className="dark:text-gray-200">No More videos!</h1>}
        >
          {vidoes.map((video) => (
            <Post
              key={video.youtubeID}
              title={video.title}
              id={video.youtubeID}
              noq={video.noq}
            />
          ))}
        </InfiniteScroll>
      )}
      {!loading && vidoes.length === 0 && (
        <h1 className="dark:text-gray-200">No Videos Found!</h1>
      )}
      {error && (
        <h1 className="dark:text-gray-200 h-screen">There was an Error!</h1>
      )}
      {loading && (
        <div className="flex items-center w-full h-screen justify-center dark:text-gray-200">
          <img className="w-1/2 h-screen" src={image} />
        </div>
      )}
    </div>
  );
}
