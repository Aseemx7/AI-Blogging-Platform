import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";

export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading || !blog) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
}
