import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMAGE_PLACEHOLDER_URL } from "../constants/images.constants";
import { useSelector } from "react-redux";
import ProductApi from "../apis/ProductsApi";

export const useProductDetails = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryIds: [],
    image: null,
    imageUrl: IMAGE_PLACEHOLDER_URL,
  })
  const categories = useSelector((state) => {
    return state.productCategories.items;
  });
  const {id: productId} = params;

  const setProductState = (productForm) => { 
    setProductForm((previousProductState) => { 
      return {
        ...previousProductState,
        ...productForm,
        categoryIds: productForm.categories.map((categoryItem) => categoryItem.id.toString()),
        imageUrl: productForm.imageUrls && productForm.imageUrls.lenght > 0 
        ? productForm.imageUrls[0]
        : IMAGE_PLACEHOLDER_URL,

      }
     })
   }

   const getProductDetail = async (productId) => {
    const productDetail = await ProductApi.getProduct(productId);
    setProductState(productDetail);
  }

  useEffect(() => { 
    ProductApi.getCategories();
    if (productId) {
      const navigationState = location.state;
  
      if (navigationState && navigationState.productForm) {
        const { productForm } = navigationState;
        setProductState(productForm);
      }
  
      getProductDetail(productId);
    }
  }, [productId, location.state]);
  

  const isEditForm = !!productId 

  return {
    location,
    navigate,
    productForm,
    setProductForm,
    categories,
    productId,
    isEditForm,
  }
}
