import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import Sidenav from "./Sidenav";
import Nav from "./Nav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Buyer_Management = () => {
  const [user, setUser] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/sign`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sign/${id}`);
      setUser((prev) => prev.filter((u) => u._id !== id));
      toast.success("Buyer deleted successfully");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  const blockUser = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/sign/block/${id}`);
      setUser((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: true } : u))
      );
      toast.info("User blocked");
    } catch (err) {
      toast.error("Cannot block user");
    }
  };

  const unblockUser = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/sign/unblock/${id}`);
      setUser((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isBlocked: false } : u))
      );
      toast.success("User unblocked");
    } catch (err) {
      toast.error("Cannot unblock user");
    }
  };

  // Search, Filter, Sort
  const filteredUsers = user
    .filter((u) =>
      search.trim() === "" ? true : u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => {
      if (statusFilter === "active") return !u.isBlocked;
      if (statusFilter === "blocked") return u.isBlocked;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "status") return a.isBlocked - b.isBlocked;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav/>

      <div className="flex flex-col md:flex-row">
        <div
          className='flex'
        >
          <Sidenav />
        </div>

        <div className="p-4 md:p-6 w-full md:ml-0 mt-20 md:mt-0">

          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by email..."
              className="p-3 w-full md:w-1/3 rounded-xl border border-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-3 rounded-xl border border-gray-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="blocked">Blocked Users</option>
            </select>

            <select
              className="p-3 rounded-xl border border-gray-300"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Sort</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-2xl shadow-xl bg-white p-4">
              <DataTable value={filteredUsers} paginator rows={5} stripedRows showGridlines>
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column
                  header="Action"
                                headerClassName="font-bold text-gray-700 text-center"
                                bodyClassName="text-center"
                                style={{ width: "200px" }}
                  body={(u) => (
                    <div className="flex gap-4 items-center justify-center">
                      {u.isBlocked ? (
                        <i
                          className="pi pi-lock text-2xl cursor-pointer"
                          style={{ color: "red" }}
                          onClick={() => unblockUser(u._id)}
                        ></i>
                      ) : (
                        <i
                          className="pi pi-lock-open text-2xl cursor-pointer"
                          style={{ color: "green" }}
                          onClick={() => blockUser(u._id)}
                        ></i>
                      )}

                      <i
                        className="pi pi-trash text-2xl text-red-600 cursor-pointer"
                        onClick={() => deleteUser(u._id)}
                      ></i>
                    </div>
                  )}
                />
              </DataTable>
            </div>
          </div>

          {/* Mobile Cards (Card A Layout) */}
          <div className="md:hidden flex flex-col gap-4 mt-4">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className="bg-white p-4 shadow-lg rounded-2xl border border-gray-200"
              >
                <p className="text-lg font-semibold text-gray-800">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
                <p className="mt-2 text-sm font-medium">
                  Status: {u.isBlocked ? "Blocked" : "Active"}
                </p>

                <div className="flex justify-between mt-4">
                  {u.isBlocked ? (
                    <button
                      onClick={() => unblockUser(u._id)}
                      className="px-4 py-2 rounded-lg bg-green-500 text-white"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => blockUser(u._id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white"
                    >
                      Block
                    </button>
                  )}

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer_Management;
