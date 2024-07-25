import { useEffect } from "react";
import { Product } from "../interfaces/Product";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../utils/validation";
import { instance } from "../api";

type Props = {
  onSubmit: (data: Product) => void;
};

const ProductForm = ({ onSubmit }: Props) => {
  const { id } = useParams();
  const {
    register,
    formState: {errors},
    reset,
    handleSubmit
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  if(id) {
    useEffect(() => {
      (async() => {
        const {data} = await instance.get(`/products/${id}`)
        reset(data.data)
      })()
    },[id])
  }
  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmit({...data,_id:id}))}>
        <h1>{id? "edit Product" : "add product"}</h1>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">title</label>
            <input type="text" className="form-control" {...register("title", {required: true})}/>
            {errors.title && <span className="text-danger">{errors.title.message}</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="price" className="form-label">price</label>
            <input type="text" className="form-control" {...register("price", {required: true, valueAsNumber: true})}/>
            {errors.price && <span className="text-danger">{errors.price.message}</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="images" className="form-label">image</label>
            <input type="text" className="form-control" {...register("images", {required: true})}/>
            {errors.images && <span className="text-danger">{errors.images.message}</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="descripiton" className="form-label">descripiton</label>
            <textarea  className="form-control" {...register("description",)}/>
        </div>

        <button>{id ? "edit" : "add"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
