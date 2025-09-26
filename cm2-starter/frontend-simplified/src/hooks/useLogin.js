import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      console.log("Login successful:", data);

      toast.success("Login Successful!");
      navigate("/"); // 登录成功后跳转首页
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials or server error.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
