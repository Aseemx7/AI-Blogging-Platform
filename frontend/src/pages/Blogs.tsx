import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

export default function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex items-center justify-center flex-col">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            author={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"12th Dec 2024"}
          />
        ))}
      </div>
    </div>
  );
}
