export const baseURL = "http://localhost:8000";

export const bookRoute = "/api/books";
export const bookRouteAll = "/api/books/all";



export const authRoute = {
  signin: "/api/signin",
  signout: "/api/signout",
  signup: "/api/signup",
  user: "/api/user/",
};

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
  
};
