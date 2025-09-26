import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      const data = await res.json();
      console.log("Signup successful:", data);

      toast.success("Account Created Successfully!");
      navigate("/login"); // 注册成功后跳转登录页
      return true;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign up.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;
