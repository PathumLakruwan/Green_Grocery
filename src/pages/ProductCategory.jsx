import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory"; // Assuming this file contains category data
import SummaryApi from "../common"; // Assuming this is where your API URL and method are defined
import RecomandedProductView from "../components/RecomandedProductView";

const ProductCategory = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  // Fetch data based on selected categories
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change for category selection
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Update filtered category list when selectCategory changes
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(arrayOfCategory);
  }, [selectCategory]);

  // Fetch data when filterCategoryList changes
  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="grid grid-cols-[200px,1fr] lg:grid-cols-[200px,1fr]">
        {/* Left Side */}
        <div className="bg-slate-100 p-2 min-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Sort By */}
          <div>
            <h3 className="text-lg uppercase font-semibold text-slate-500 border-b border-slate-800">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" />
                <label htmlFor="lowToHigh">Price: Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" />
                <label htmlFor="highToLow">Price: High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter By */}
          <div>
            <h3 className="text-lg uppercase font-semibold text-slate-500 border-b border-slate-800">
              Filter By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div
                  key={categoryName.value}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName.value] || false}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>
                    {categoryName.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div>
          <p>Showing Number Of Matching Products: {data.length}</p>
          {!loading && data.length > 0 && (
            <RecomandedProductView data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import productCategory from '../helpers/productCategory'
// import SummaryApi from '../common'
// import RecomandedProductView from '../components/RecomandedProductView'

// const ProductCategory = () => {

//   const params = useParams()
//   const [data,setData] = useState([])
//   const[loading,setLoading] = useState(false)
//   const[selectCategory,setSelectCategory] = useState([])
//   const [filterCategoryList,setFilterCategoryList] =useState([])

//   const fetchData = async()=>{
//     setLoading(true)
//     const response = await fetch(SummaryApi.filterProduct.url,{
//       method : SummaryApi.filterProduct.method,
//       headers : {
//         'content-type' : 'application/json'
//         },
//       body: JSON.stringify({
//         category:filterCategoryList
//       })
//     })

//     setLoading(false)
//     const dataResponse = await response.json()

//     setData(dataResponse?.data || [])
//     console.log('data responseeee', dataResponse)
//   }

//   const handleSelectCategory = (e) => {
//     const {name , value , checked} = e.target

//     setSelectCategory((preve)=>{
//       return{
//         ...preve,
//         [value] : checked
//       }
//     })
//   }

//   useEffect(()=>{
//     fetchData()
//   },[filterCategoryList])

//   //console.log('Selected Categoryyyyyy',setSelectCategory)

//   useEffect(()=>{
//     const arryOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
//       if(selectCategory[categoryKeyName]){
//         return categoryKeyName
//       }

//       return null
//     }).filter(el => el)

//     setFilterCategoryList(arryOfCategory)

//     //console.log('CategorySelecteeeee',arryOfCategory)
//   },[selectCategory])

//   //{params?.category}

//   return (
//     <div className=' container mx-auto p-4 '>
//       {/* Desktop Version */}

//       <div className=' hidden lg:grid grid-cols-[200px,1fr]'>

//         {/* Left Side */}
//         <div className=' bg-slate-100 p-2 min-h-[calc(100vh-120px)] overflow-y-auto'>
//           {/* Class By */}
//           <div className=''>
//             <h3 className=' text-lg uppercase font-semibold text-slate-500 border-b border-slate-800'>Sort By</h3>

//             <form className='text-sm flex flex-col gap-2 py-2'>

//               <div className='flex items-center gap-2'>
//                 <input type="radio" name='sortBy' />
//                 <label htmlFor="">Price: Low to High</label>
//               </div>

//               <div className='flex items-center gap-2'>
//                 <input  type="radio" name='sortBy' />
//                 <label htmlFor="">Price: High to Low</label>
//               </div>
//             </form>
//           </div>

//           {/* Filtered By */}
//           <div className=''>
//             <h3 className=' text-lg uppercase font-semibold text-slate-500 border-b border-slate-800'>Sort By</h3>

//             <form className='text-sm flex flex-col gap-2 py-2'>
//               {
//                 productCategory.map((categoryName,index)=>{
//                   return(
//                     <div className=' flex items-center gap-2'>
//                       <input type="checkbox" name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
//                       <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
//                     </div>
//                   )
//                 })
//               }
//             </form>

//           </div>
//         </div>

//         {/* Right Side */}
//         <div>
//         <p>Showing the Number Of Matching Products : {data.length}</p>
//           {
//             data.length !== 0 && !loading && (
//               <RecomandedProductView data= {data} loading= {loading}/>
//             )
//           }

//         </div>

//         </div>

//     </div>
//   )
// }

// export default ProductCategory
