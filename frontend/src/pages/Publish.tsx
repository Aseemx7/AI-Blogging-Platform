import { useState, type ChangeEvent } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import type { createBlogType } from "@aseem77/medium-common";
import { useNavigate } from "react-router-dom";

export default function Publish() {
  const navigate = useNavigate();
  const [blogInput, setBlogInput] = useState<createBlogType>({
    title: "",
    content: "",
  });

  return (
    <div>
      <AppBar />
      <div className="flex justify-center items-center flex-col mt-5">
        <input
          type="text"
          placeholder="Title"
          className="text-gray-600 py-2 px-4 w-4xl border-2 border-gray-400 rounded-md "
          onChange={(e) =>
            setBlogInput({
              ...blogInput,
              title: e.target.value,
            })
          }
        />
        <TextArea
          onChange={(e) =>
            setBlogInput({
              ...blogInput,
              content: e.target.value,
            })
          }
        />
        <button
          className="bg-blue-600 text-white py-1.5 px-3 rounded-lg mt-5"
          onClick={async () => {
            const res = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              blogInput,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            navigate(`/blog/${res.data.id}`);
          }}
        >
          Publish post
        </button>
      </div>
    </div>
  );
}

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="flex items-center flex-col mt-7">
      <textarea
        rows={8}
        className="border-2 border-gray-400 rounded-md w-4xl py-2 px-3"
        placeholder="Write an Article..."
        onChange={onChange}
      ></textarea>
    </div>
  );
}
