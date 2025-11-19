import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
export default function Loginn() {
  const [data, setData] = useState({ username: "", email: "" });
  const HandelChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
//   const Navigate = useNavigate
  const Submit = (e) => {
    e.preventDefault();
    const storeData = JSON.parse(localStorage.getItem("signupData"));
    if (
      storeData.username === data.username &&
      storeData.email === data.email
    ) {
      localStorage.setItem("LoginData",JSON.stringify(storeData));
      Swal.fire("success", "you are loged in", "success");
    //   Navigate("/Dashboard");
    } else {
      Swal.fire("error", "Wrong email or password", "eror");
      setData({email:"",password:""})
    }
  };
  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login in to your account</h2>
        </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={Submit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={HandelChange}
                  placeholder="Enter Your Email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                    value={data.password}
                  onChange={HandelChange}
                  placeholder="Enter Your Password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>

         
        </div>

      
     
    </div>
    </>
  );
}