import toast from "react-hot-toast";
import { setCategories } from "../redux/productCategories/productCategoriesSlice";
import { setLoading, setProducts, addProduct, editProduct, setError, deleteProduct } from "../redux/products/productsSlice";
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
            toast.success("Product created sucessfully!")
        } catch (e) {
            console.log("Error post produc:", e.message);
            toast.error("Failed to create Product")
        }finally {
            store.dispatch(setLoading(false));
        }
    }

    
    static async updateProduct(id, productsData) {
        store.dispatch(setLoading(true))
        try {
            const response = await axiosInstance.put(`/products/${id}`, productsData, {
                headers: { "Content-Type" : "multipart/form-data"}
            })
            store.dispatch(editProduct(response.data))
            toast.success("Product updated sucessfully!")
        } catch(error) {
            console.log("Error get Product", error.message);
            store.dispatch(setError(error))
            toast.error("Failed to update Product")
        } finally {
        store.dispatch(setLoading(false))
        }
    }

    static async deleteProduct(id, page, limit, query) {
        store.dispatch(setLoading(true))
        try {
            await axiosInstance.delete(`/products/${id}`)
            toast.success("Product deleted sucessfully!")
            await this.getProduct(page, limit, query)
        } catch(error) {
            console.log("Error get Product", error.message);
            store.dispatch(setError(error))
            toast.error("Failed to delete Product")
        } finally {
            store.dispatch(setLoading(false))
        }
    }
}

export default ProductApi;