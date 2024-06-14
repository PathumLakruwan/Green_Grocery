import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-400 gap-4">
      <Link className="hover:text-white" to="/home">
        Home
      </Link>{" "}
      <br />
      <Link className="hover:text-white" to="/register">
        Register
      </Link>{" "}
      <br />
      <Link className="hover:text-white" to="/login">
        {" "}
        Login
      </Link>{" "}
      <br />
      <Link className="hover:text-white" to="/adminPanel">
        {" "}
        AdminPanel
      </Link>{" "}
      <br />
      <Link className="hover:text-white" to="/allUsers">
        {" "}
        AllUsers
      </Link>{" "}
      <br />
      <Link className="hover:text-white" to="/changeUserRole">
        {" "}
        changeUserRole
      </Link>{" "}
      <br />
    </nav>
  );
}
