import React from "react";
import CategoryList from "../components/CategoryList";
import ProductBanners from "../components/ProductBanners";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VertialCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="bg-white">
      <CategoryList />
      <ProductBanners />

      <HorizontalCardProduct
        category={"vegetables"}
        heading={"Fresh Vegetables"}
      />
      <VertialCardProduct
       category={"Organic Products"}
       heading={"100% Pure Organic Products"} 
      />
      <HorizontalCardProduct
        category={"fruits"}
        heading={"Sweet Fruits"}
      />
      <HorizontalCardProduct
        category={"leaves"}
        heading={"Leafy Greens"}
      />
      <VertialCardProduct
       category={"Dairy and Eggs"}
       heading={"Dairy & Eggs"} 
      />
      <HorizontalCardProduct
        category={"herbs"}
        heading={"Flavorful Herbs"}
      />
      <VertialCardProduct
        category={"herbs"}
        heading={"Flavorful Herbs"}
      />
      <HorizontalCardProduct
        category={"Nuts and Seeds"}
        heading={"Nuts and Seeds"}
      />
      <VertialCardProduct
       category={"Organic Products"}
       heading={"100% Pure Organic Products"} 
      />
      <HorizontalCardProduct
        category={"Grains"}
        heading={"Grains"}
      />
    </div>
    
  );
};

export default Home;
