const serverUrl = "http://localhost:8000";

const SummaryApi = {
  register: {
    url: "http://localhost:8000/api/register",
    method: "post",
  },

  login: {
    url: "http://localhost:8000/api/login",
    method: "post",
  },

  currentUser: {
    url: "http://localhost:8000/api/user-details",
    method: "get",
  },

  logout: {
    url: "http://localhost:8000/api/userLogout",
    method: "get",
  },

  allUsers: {
    url: "http://localhost:8000/api/allUsers",
    method: "get",
  },

  updateUser: {
    url: "http://localhost:8000/api/updateUser",
    method: "post",
  },

  uploadProducts: {
    url: "http://localhost:8000/api/uploadProducts",
    method: "post",
  },

  getProduct: {
    url: "http://localhost:8000/api/getProduct",
    method: "get",
  },

  updateProduct: {
    url: "http://localhost:8000/api/updateProduct",
    method: "post",
  },

  categoryProduct: {
    url: "http://localhost:8000/api/getProductCategory",
    method: "get",
  },

  categoryWiseProduct: {
    url: "http://localhost:8000/api/categeryWiseProduct",
    method: "post",
  },

  productDetails: {
    url: "http://localhost:8000/api/productDetails",
    method: "post",
  },
  addToCartProduct: {
    url: "http://localhost:8000/api/addTocart",
    method: "post",
  },
  countAddToCartProduct: {
    url: "http://localhost:8000/api/countAddToCartProduct",
    method: "get",
  },
  addToCartProductView: {
    url: "http://localhost:8000/api/viewCartProduct",
    method: "get",
  },
  updateCartQty: {
    url: "http://localhost:8000/api/updateCartQty",
    method: "post",
  },
  deleteCartProduct: {
    url: "http://localhost:8000/api/deleteCartProduct",
    method: "delete",
  },
  searchProduct: {
    url: "http://localhost:8000/api/search",
    method: "get",
  },
  filterProduct: {
    url: "http://localhost:8000/api/filterProduct",
    method: "post",
  },
  addToCartWithQuantity: {
    url: "http://localhost:8000/api/addToCartWithQuantity",
    method: "post",
  },
  checkout: {
    url: "http://localhost:8000/api/checkout",
    method: "post",
  },
  getReceiptsByOrderID: {
    url: "http://localhost:8000/api/receipts",
    method: "get",
  },
  deleteReceipt: {
    url: "http://localhost:8000/api/deleteReceipt",
    method: "post",
  },
  userReceipt: {
    url: "http://localhost:8000/api/userReceipt",
    method: "get",
  },
  getReports:{
    url: "http://localhost:8000/api/generateReport",
    method: "get",
  },
  deleteProduct:{
    url: "http://localhost:8000/api/deleteProduct",
    method: "delete",
  }

};

export default SummaryApi;
