import React, { useEffect, useState } from 'react'


const AuthState = React.createContext()

const AuthUpdate = React.createContext()


export function useAuthState() {
  const context = React.useContext(AuthState);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthUpdate() {
  const context = React.useContext(AuthUpdate);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function AuthContext({ children }) {

  const [searchData, setSearchData] = useState(null);

  const userData = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  const token = localStorage.getItem("token")
    ? localStorage.getItem('token').toString()
    : null;

  const [auth, setauth] = useState({ user: userData, token: token });


  useEffect(() => {
    // console.log('re-rendered')
    const userData = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;

    const token = localStorage.getItem("token")
      ? localStorage.getItem('token').toString()
      : null;

    setauth({ user: userData, token: token })

  }, []);

  const updateAuth = (payload) => {
    setauth(payload)
  }

  return (
    <AuthState.Provider value={{ auth, searchData, setSearchData }}>
      <AuthUpdate.Provider value={updateAuth}>
        {children}
      </AuthUpdate.Provider>
    </AuthState.Provider>
  )
}

export default AuthContext