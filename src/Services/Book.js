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
    .get(`${baseURL}${bookRoute}/filter?${filter}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
};

export const getSearchedBooks = async (title) => {
  return await axios
    .get(`${baseURL}${bookRoute}/search?search=${title}`, getHeader())
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
  console.log("got wishlisted book")
  return await axios.get(`${baseURL}/api/user/${id}/wishlist`, getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}
export const addtowishlist = async (userid,bookId) =>{
  console.log("add to wishlist api called")
  return await axios.post(`${baseURL}/api/user/${userid}/wishlist`,{bookId}, getHeader()).then((res) => {
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}

export const getrecommendedbooksbyid = async(id)=>{
  console.log("recomended api call")
    return await axios.get( `${baseURL}/api/user/${id}/getRecommendations`  ,getHeader()).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return {err:"error occurred"}
    })
}

export const getreadbooksbyid = async (id) => {
  console.log("read api call")
  return await axios.get(`${baseURL}/api/user/${id}/readBooks`, getHeader()).then((res) => {
    console.log(res.data)
    return res.data;
  }).catch((err) => {
    return { err: "error occurred" }
  })
}
export const addtoread = async (userid,bookId) => {

  return await axios.post(`${baseURL}/api/user/${userid}/readBooks`,{bookId},getHeader()).then((res) => {
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
// export const getBooksByRating = async (limit, skip) => {
//   return await axios.get(`${baseURL}${bookRoute}/sort/rating?order=asc/dsc&limit=${limit}&skip=${skip}`, getHeader())
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return { err: "error occurred" };
//     });
// }

// sort by price
export const getBooksBySort = async (sortBy,limit, skip,query) => {
  return await axios.get(`${baseURL}${bookRoute}/sort/${sortBy}?limit=${limit}&skip=${skip}&${query}`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}

// export const getBooksByReviews = async (limit, skip) => {
//   return await axios.get(`${baseURL}${bookRoute}/sort/noOfReviews?order=asc&limit=${limit}&skip=${skip}`, getHeader())
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return { err: "error occurred" };
//     });
// }

// /books/getallAuthors
export const getAllAuthors = async () => {
  return await axios.get(`${baseURL}${bookRoute}/getallAuthors`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}

export const getAllCategories = async()=>{
  return await axios.get(`${baseURL}${bookRoute}/categories`, getHeader())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { err: "error occurred" };
    });
}


// http://localhost:8000/api/books/filter?author=Seth Godin


