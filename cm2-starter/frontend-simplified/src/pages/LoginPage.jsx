import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {

    try {
      // const res = await fetch("/api/user", {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      // Assuming the response includes a token or user data
      const data = await res.json();
      console.log("Login successful, received data:", data);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials or server error.");
      return false;
    }

    // console.log("Credentials for Login:", credentials);
    // Mock a successful login after a small delay
    // await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    const success = await handleLogin(credentials);

    if (success) {
      toast.success("Login Successful!");
      return navigate("/");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>

            <p className="mt-4 text-center">
              Don't have an account?
              <a href="/signup" className="text-indigo-500 hover:text-indigo-600 ml-1">Sign Up</a>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;