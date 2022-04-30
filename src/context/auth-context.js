import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/user.service";
import { ToastMessage } from "../components/Toast/Toast";
import { ToastType } from "../utils/constants";

const key = "SHINOBI_WATCH";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(key)) || {});
  let navigate = useNavigate();

  const handleLogin = async ({ email, password, from }) => {
    try {
      const {
        data: { foundUser, encodedToken },
      } = await loginUser({ email, password });
      if (encodedToken) {
        localStorage.setItem(
          key,
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setUser({ user: foundUser, token: encodedToken });
        ToastMessage("Logged in successfully", ToastType.Success);
        navigate(from, { replace: true });
      }
    } catch (err) {
      //  ['config', 'request', 'response', 'isAxiosError', 'toJSON']
      console.error(err);
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const handleSignUp = async ({ name, email, password, from }) => {
    try {
      const {
        data: { createdUser, encodedToken },
      } = await signupUser({ name, email, password });
      if (encodedToken) {
        localStorage.setItem(
          key,
          JSON.stringify({ user: createdUser, token: encodedToken })
        );
        setUser({ user: createdUser, token: encodedToken });
        ToastMessage("Sign up successful", ToastType.Success);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      ToastMessage(err.response.data.errors[0], ToastType.Error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem(key);
    setUser({});
    ToastMessage("Logged out", ToastType.Success);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleSignUp, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!AuthContext) throw new Error("Auth Context was not created");

  return context;
};

export { useAuth, AuthProvider };
