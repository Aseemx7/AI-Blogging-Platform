import { AvatarComponent } from "./BlogCard";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <div className="border-b flex justify-between items-center px-10 py-3">
      <div>
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-7"
          >
            New
          </button>
        </Link>

        <AvatarComponent name="Aseem" size="big" />
      </div>
    </div>
  );
}
