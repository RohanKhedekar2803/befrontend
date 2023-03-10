import axios from "axios";
import { baseURL, bookRoute, bookRouteAll, getHeader } from "./config";

export const getAllBooks = async (limit, skip) => {
  return await axios
    .get(`${baseURL}${bookRouteAll}?limit=${limit}&skip=${skip}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
};

export const getFilteredBooks = async (filter) => {
  return await axios
    .get(`${baseURL}${bookRoute}/filter`, filter, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
};

export const getBookById = async (id) => {
  return await axios
    .get(`${baseURL}${bookRoute}/${id}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
};

export const getwishlistedbooksbyid = async (id) => {
  return await axios.get(`${baseURL}/api/user/${id}/wishlist`, getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}
export const addtowishlist = async (id) =>{
  console.log(getHeader())
  return await axios.post(`${baseURL}/api/user/${id}/wishlist`,{}, getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}

// export const getrecommendedbooksbyid = async(id)=>{
//     return await axios.get( tobedone  ,getHeader()).then((res)=>{
//         return res.data;
//     }).catch((err)=>{
//         return {err:"error occurred"}
//     })
// }

export const getreadbooksbyid = async (id) => {

  return await axios.get(`${baseURL}/api/user/${id}/readBooks`, getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}
export const addtoread = async (id) => {

  return await axios.post(`${baseURL}/api/user/${id}/readBooks`,{},getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}

export const searchBooks = async (search) => {
  return await axios.get(`${baseURL}${bookRoute}/search?search=${search}`, getHeader())
    .then((res) => {
      console.log(res.data)
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}


export const getCategories = async () => {
  return await axios.get(`${baseURL}${bookRoute}/categories`, getHeader())
    .then((res) => {
      console.log(res)
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}

//sort by rating
export const getBooksByRating = async (limit, skip) => {
  return await axios.get(`${baseURL}${bookRoute}/sort/rating?order=asc/dsc&limit=${limit}&skip=${skip}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}

// sort by price
export const getBooksByPrice = async (limit, skip) => {
  return await axios.get(`${baseURL}${bookRoute}/sort/price?order=asc/dsc&limit=${limit}&skip=${skip}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}
