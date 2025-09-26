import { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import useSignup from "../hooks/useSignup";

const SignUpPage = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [dob, setDob] = useState(""); // Date of Birth
  const [membershipStatus, setMembershipStatus] = useState("Standard");

  const { signup, loading } = useSignup();
  //const navigate = useNavigate();

  // Placeholder function for handling signup logic
  /*const handleSignUp = async (userData) => {
    try {
      // const res = await fetch("/api/user", {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Sign up failed");
      }
      return true;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign up.");
      return false;
    }

    // console.log("User Data for Signup:", userData);
    return true;
  };
*/

  const submitForm = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      phone_number: phone,
      gender,
      date_of_birth: dob,
      membership_status: membershipStatus,
    };
    await signup(userData);
};

/*    const success = await handleSignUp(userData);

    if (success) {
      toast.success("Account Created Successfully!");

      return navigate("/login");
    }
  };
*/

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-16">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Create Account</h2>

            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Enter a strong password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="border rounded w-full py-2 px-3"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth Field */}
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="border rounded w-full py-2 px-3"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Membership Status Field */}
            <div className="mb-4">
              <label htmlFor="membershipStatus" className="block text-gray-700 font-bold mb-2">
                Membership Status
              </label>
              <select
                id="membershipStatus"
                name="membershipStatus"
                className="border rounded w-full py-2 px-3"
                required
                value={membershipStatus}
                onChange={(e) => setMembershipStatus(e.target.value)}
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Pro">Pro</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;