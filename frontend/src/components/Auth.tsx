import type { signupType } from "@aseem77/medium-common";
import axios from "axios";
import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [signupParams, setSignupParams] = useState<signupType>({
    name: "",
    email: "",
    password: "",
  });

  async function sendReq() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        signupParams
      );
      const token = response.data;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (e) {
      alert("Request failed...");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div className="font-bold text-3xl text-center">Create an account</div>
        <div className="text-center mt-2 mb-6 text-gray-400">
          {type === "signin"
            ? "Dont have an Account?"
            : "Already have an account?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="ml-2 underline"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
        <div>
          {type === "signin" ? (
            ""
          ) : (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setSignupParams({
                  ...signupParams,
                  name: e.target.value,
                })
              }
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="john@example.com"
            onChange={(e) =>
              setSignupParams({
                ...signupParams,
                email: e.target.value,
              })
            }
          />
          <LabelledInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={(e) =>
              setSignupParams({
                ...signupParams,
                password: e.target.value,
              })
            }
          />
          <button
            className="px-4 py-2 rounded-md bg-gray-900 text-white w-96 mt-3 font-medium"
            onClick={sendReq}
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

type labelledInputType = {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputType) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="py-2 px-4 mb-3 border border-slate-400 rounded-lg w-96"
      />
    </div>
  );
}
