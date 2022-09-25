import React from "react";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import UserContainer from "../components/UserContainer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  let Endpoints = "https://api.github.com/users";
  const user1 = useRef("");

  async function user() {
    if (user1.current.value === "") {
      setLoading(true);
      const data = await fetch(Endpoints);
      const res = await data.json();
      console.log(res);
      setUsers(res);
      setLoading(null);
    }
  }
  async function FindUser() {
    setLoading(true);
    // console.log(user1.current.value);
    if (user1.current.value != "") {
      setUsers("");
      const data = await fetch(Endpoints + "/" + user1.current.value);
      const res = await data.json();
      console.log(res);
      setUsers(() => [res]);
      user1.current.value = "";
    } else {
      user();
    }
    setLoading(null);
  }
  useEffect(() => {
    user();
  }, [setUsers]);

  return (
    <div>
      <div className="flex justify-center h-11  my-5 items-center">
        <input
          placeholder="Search github username"
          ref={user1}
          type="text"
          className="h-full md:w-1/3 outline-none text-gray-800 px-2 
          font-semibold text-lg w-2/3"
        />
        <button
          onClick={FindUser}
          className="bg-green-500 font-semibold  px-4 h-full font-[Poppins]"
        >
          Search
        </button>
      </div>
      {loading ? <Loading /> : <UserContainer users={users} />}
    </div>
  );
};

export default Users;
