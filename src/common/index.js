const serverUrl = 'http://localhost:8000'

const SummaryApi = {
    register:{
        url: 'http://localhost:8000/api/register',
        method: 'post'
    },

    login:{
        url: 'http://localhost:8000/api/login',
        method: 'post'
    },

    currentUser:{
        url: 'http://localhost:8000/api/user-details',
        method: 'get'
    },

    logout:{
        url: 'http://localhost:8000/api/userLogout',
        method: 'get'
    },

    allUsers:{
        url: 'http://localhost:8000/api/allUsers',
        method: 'get'
    },

    updateUser:{
        url: 'http://localhost:8000/api/updateUser',
        method: 'post'
    },

    uploadProducts:{
        url: 'http://localhost:8000/api/uploadProducts',
        method: 'post'
    },

    getProduct:{
        url: 'http://localhost:8000/api/getProduct',
        method: 'get'
    },

    updateProduct:{
        url: 'http://localhost:8000/api/updateProduct',
        method: 'post'
    },

    categoryProduct:{
        url: 'http://localhost:8000/api/getProductCategory',
        method: 'get'
    },

    categoryWiseProduct:{
        url: 'http://localhost:8000/api/categeryWiseProduct',
        method: 'post'
    },
    
    productDetails:{
        url: 'http://localhost:8000/api/productDetails',
        method: 'post'
    },


}

export default SummaryApi