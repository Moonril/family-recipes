import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchCurrentUser(savedToken);
    }
  }, []);

  const fetchCurrentUser = async (jwt) => {
    try {
      const res = await axios.get("http://localhost:8080/api/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUser(res.data); // <-- contiene username
    } catch (err) {
      logout();
    }
  };

  const login = async (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    await fetchCurrentUser(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        username: user?.username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
