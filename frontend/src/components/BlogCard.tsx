import { Link } from "react-router-dom";

interface blogCard {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export default function BlogCard({
  author,
  title,
  content,
  publishedDate,
  id,
}: blogCard) {
  return (
    <div>
      <Link to={`/blog/${id}`}>
        <div className="mt-4 flex items-center gap-x-1.5 min-w-full px-8 md:px-0 md:min-w-xl">
          <AvatarComponent name={author} />
          <div className="text-sm">{author} </div>
          <div className="h-1 w-1 bg-slate-400 rounded-full"></div>
          <div className="text-gray-500 font-light text-sm">
            {" "}
            {publishedDate}{" "}
          </div>
        </div>
        <div className="text-2xl font-semibold mt-2">{title}</div>
        <div className="mt-1 mb-4 font-light">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="mb-8 text-slate-400 text-sm font-light">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
        <div className="border-b border-slate-300 "></div>
      </Link>
    </div>
  );
}

export function AvatarComponent({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      } `}
    >
      <span
        className={`font-medium text-gray-600 dark:text-gray-300 ${
          size === "small" ? "text-xs" : "text-sm"
        }`}
      >
        {name[0]}
      </span>
    </div>
  );
}
