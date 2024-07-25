import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./interfaces/Product";
import { instance } from "./api";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./components/ProductForm";
import AuthForm from "./components/AuthForm";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const nav = useNavigate()
  const fetchProduct = (async () => {
    const { data } = await instance.get(`/products`);
    setProducts(data.data);
    console.log(data);
    
  })
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleRemove = async (id: any) => {
    if (confirm("xoa?")) {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter((item) => item._id !== id));
    }
  };

  const onSubmitProduct = async(data: Product) => {
    if(data._id){
      await instance.patch(`/products/${data._id}`, { ...data, _id: undefined })
      console.log(data);
      
      fetchProduct()
      nav(`/admin`)
    }else{
      const res = await instance.post(`/products`,data) 
      setProducts([...products,res.data.data])
      console.log(data);
      
      nav(`/admin`)
     }
    }
  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<AuthForm isLogin/>}/>
        <Route path="/register" element={<AuthForm/>}/>
        <Route path="/admin" element={<Dashboard products={products} onRemove={handleRemove}/>}/>
        <Route path="/admin/add" element={<ProductForm onSubmit={onSubmitProduct}/>}/>
        <Route path="/admin/edit/:id" element={<ProductForm onSubmit={onSubmitProduct}/>}/>
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </>
  );
}

export default App;
