import type { Blog } from "../hooks";
import AppBar from "./AppBar";
import { AvatarComponent } from "./BlogCard";

export default function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div>
      <AppBar />
      <div className="grid grid-cols-12 mt-12 mx-20">
        <div className="col-span-8">
          <div className="text-4xl font-extrabold mb-2.5">{blog.title}</div>
          <div className="mb-3.5 text-gray-500">Posted on August 24, 2023</div>
          <div className="text-gray-600">{blog.content}</div>
        </div>
        <div className="col-span-4 pl-7">
          <div>Author</div>
          <div className="flex items-center mt-4 gap-3">
            <div>
              <AvatarComponent
                name={blog.author.name || "Anonymous"}
                size="big"
              />
            </div>
            <div>
              <div className="font-bold text-2xl mb-2">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="text-gray-600">
                Master of mirth, purveyor of puns, and the funniest person in
                the kingdom.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
