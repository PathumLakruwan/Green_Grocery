import React from "react";
import { FaRegCircleUser, FaRegCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, Route, Routes } from "react-router-dom";

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-green-200 min-h-full w-full max-w-60">
        <div className=" h-36 bg-purple-300 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center py-1">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-10 h-10 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className=" capitalize font-semibold">{user?.name}</p>
          <p className=" text-xs">{user?.role}</p>

          <div>
            <nav className=" grid font-semibold text-sm justify-center flex-col items-center ">
              <Link
                to={"/allUsers"}
                className=" px-2 py-1 hover:bg-purple-500 rounded-full"
              >
                All Users
              </Link>
              <Link
                to={"/allProducts"}
                className=" px-2 py-1 hover:bg-purple-500 rounded-full"
              >
                All Products
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      <main className="bg-slate-200 min-h-full w-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
