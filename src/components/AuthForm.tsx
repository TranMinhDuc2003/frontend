import { useForm } from "react-hook-form"
import { User } from "../interfaces/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { instance } from "../api"
import { loginSchema, registerSchema } from "../utils/validation"

type Props = {
    isLogin? : boolean
}

const AuthForm = ({isLogin}: Props) => {
    const {
        handleSubmit,formState: {errors}, register
    }= useForm<User>({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    })

    const onsubmit = async(data: User) => {
        if(isLogin) {
            
           const res = await instance.post(`/login`,data)
            console.log(res);
            
        }else{
            await instance.post(`/register`, data)
            console.log(data);
            
        }
    }
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
        <h1>{isLogin ? "login" : "register"}</h1>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input type="text" className="form-control" {...register("email", {required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">password</label>
            <input type="text" className="form-control" {...register("password", {required:true})} />
        </div>
        {!isLogin && (
             <div className="mb-3">
             <label htmlFor="confirmPass" className="form-label">confirmPass</label>
             <input type="text" className="form-control" {...register("confirmPass", {required:true})} />
         </div>
        )}
        <button className="btn btn-success">{isLogin ? "login" : "register"}</button>
    </form>
  )
}

export default AuthForm