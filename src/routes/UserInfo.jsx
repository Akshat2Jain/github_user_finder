import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const UserInfo = () => {
  const [user, setuser] = useState([]);
  const { pathname } = useLocation();
  const [loading,setLoading]=useState(null)
  const navigate = useNavigate();
  console.log(pathname);
  const Url = "https://api.github.com/users";
  async function userdetail() {
    setLoading(true)
    const data = await fetch("https://api.github.com/users" + pathname);
    const res = await data.json();
    console.log(res);
    setuser(() => [res]);
    setLoading(null)
  }
  useEffect(() => {
    userdetail();
  }, [pathname]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-green-600 rounded text-gray-200"
      >
        BACK
      </button>
      {loading ? <Loading/> :
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row
             md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-green-400 md:mx-0 mx-auto"
            />
            <div className="text-lg leading-10 px-3">
              <h1 className="text-3xl pb-4">{uinfo.name}</h1>
              <h1>
                <span className="text-green-400">Login_name</span> :{uinfo.login}
              </h1>
              <h1>
                <span className="text-green-400">followers : </span>
                {uinfo.followers}
              </h1>
              <h1>
                <span className="text-green-400">following : </span>
                {uinfo.following}
              </h1>
              <h1>
                <span className="text-green-400">public_repositories : </span>
                {uinfo.public_repos}
              </h1>
              <h1>
                <span className="text-green-400">Join : </span>
                {new Date(uinfo.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo.html_url}
                target="_blank"
                className="text-gray-200 
                  font-semibold rounded cursor-pointer  px-4 py-1 bg-green-600 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl ">
        {/* <Tabs type={type} setType={setType} /> */}
      </div>
    </div>
  );
};

export default UserInfo;
