import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import AuthApi from "../apis/AuthApi";

export const AuthContext = createContext(null);

const AuthContextProvider = AuthContext.Provider; // Component

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const decodeAndSetUser = (accessTokenParam) => {
    const jwtPayload = jwtDecode(accessTokenParam);
    const newUser = {
      id: jwtPayload.sub,
      username: jwtPayload.username,
      email: jwtPayload.email,
      name: jwtPayload.name,
      role: jwtPayload.role,
      profilePictureUrl: jwtPayload.profilePictureUrl,
    };

    setUser(newUser);
  };

  const loadUser = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      decodeAndSetUser(accessToken);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (username, password) => {
    const { access_token, refresh_token } = await AuthApi.login(
      username,
      password
    );
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    decodeAndSetUser(access_token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContextProvider value={{ logout, user, isAuthenticated, login }}>
      {children}
    </AuthContextProvider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
