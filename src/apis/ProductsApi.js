import { setCategories } from "../redux/productCategories/productCategoriesSlice";
import { setLoading, setProducts, addProduct, editProduct, setError } from "../redux/products/productsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";
import dayjs from 'dayjs'

class ProductApi {
    static async getProducts(page=1, limit=10, query){
        store.dispatch(setLoading(true))
        try {
            const res = await axiosInstance.get("/products", {
                params: {
                    page,
                    limit,
                    query,
                }
            });
            const {data} = res;
            store.dispatch(setProducts({
                items: data.items,
                total: data.total,
            }));
        } catch (e) {
            console.log("error: ", e.message);
            throw new Error(`ProductsApi getProducts: ${e.message}`);
        } finally {
            store.dispatch(setLoading(false));
        }
    }

    static async getProduct(id){
        store.dispatch(setLoading(true))
        try {
            const res = await axiosInstance.get(`/products/${id}`);
            return res.data;
        } catch (e) {
            console.log("error: ", e.message);
            store.dispatch(setError(e));
        } finally {
            store.dispatch(setLoading(false));
        }
    }

    static async getCategories(){
        store.dispatch(setLoading(true))
        const lastFetch = store.getState().productCategories.lastFetch
        try {
            if (lastFetch) {
                const currentDate = dayjs(new Date().toISOString());
                const isLessThanOneHour = currentDate.diff(lastFetch, "hour", true) < 1;
                if (isLessThanOneHour) {
                    return;
                }
            }
            
            const res = await axiosInstance.get("/categories");
            const {data} = res;
            store.dispatch(setCategories(data));
            
        } catch (e) {
            console.log("error: ", e.message);
            throw new Error(`categoriesApi getcategories: ${e.message}`);
        } finally {
            store.dispatch(setLoading(false));
        }
    }

    static async createProduct(productData){
        store.dispatch(setLoading(true));
        try {
            const res = await axiosInstance.post("/products", productData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            store.dispatch(addProduct(res.data))
        } catch (e) {
            console.log("Error post produc:", e.message);
            store.dispatch(setLoading(false));
            
        }
    }

    
    static async updateProduct(id, productsData) {
        store.dispatch(setLoading(true))
        try {
        const response = await axiosInstance.post(`/products/${id}`, productsData, {
            headers: { "Content-Type" : "multipart/form-data"}
        })
        store.dispatch(editProduct(response.data))
        return response.data
        } catch(error) {
        console.log("Error get Product", error.message);
        store.dispatch(setError(error))
        } finally {
        store.dispatch(setLoading(false))
        }
    }
}

export default ProductApi;