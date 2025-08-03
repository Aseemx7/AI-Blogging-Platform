import { useEffect } from "react";
import Spinner from "./Spinner";
import { userInfo } from "../features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

type myJwtPayload = {
  id: string;
};

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchUserInfo(token, navigate, dispatch);
      })();
    } else {
      navigate("/signup");
    }
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
}

export async function fetchUserInfo(
  token: string,
  navigate: ReturnType<typeof useNavigate>,
  dispatch: ReturnType<typeof useDispatch>
) {
  try {
    const decoded = jwtDecode<myJwtPayload>(token || "");
    if (!decoded.id) {
      console.log("Invalid Signature");
      navigate("/signin");
      return;
    }
    axios
      .post(`http://localhost:8787/api/v1/user/find`, {
        id: decoded.id,
      })
      .then((res) => {
        if (!res.data) {
          console.log("Invalid User");
          navigate("/signin");
          return;
        }
        const { name, email } = res.data.foundUser;
        dispatch(userInfo({ name, email }));
        localStorage.setItem("user", JSON.stringify({ name, email }));
        navigate("/blogs");
      });
  } catch (e) {
    navigate("/signin");
    console.log("Token is not Valid!!");
  }
}
