import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { loginApi } from "../services/UserService";
import "./Login.scss";

const Login = () => {
   const navigate = useNavigate();
   const { loginContext, user } = useContext(UserContext);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isShowPassword, setIsShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (user && user.auth === true) {
         navigate("/");
      }
   }, [user.auth]);

   const handleLogin = async () => {
      if (!email || !password) {
         toast.error("Email & Password is required !!!");
         return;
      }

      setIsLoading(true);

      let res = await loginApi(email.trim(), password);
      if (res && res.token) {
         toast.success("Login Success !!!");
         setEmail("");
         setPassword("");
         loginContext(email, res.token);
         navigate("/");
      } else {
         if (res && res.status === 400) {
            toast.error(res.data.error);
         }
      }

      setIsLoading(false);
   };

   const handlePressEnter = async (event) => {
      if (event && event.key === "Enter") {
         handleLogin();
      }
   };

   return (
      <>
         <div className="login-container">
            <div className="title text-center">Log in</div>
            <div className="content-form col-sm-6 col-lg-4 mx-auto">
               <div className="form-group">
                  <label>Email (eve.holt@reqres.in)</label>
                  <input
                     type="email"
                     className="form-control"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     onKeyDown={(event) => handlePressEnter(event)}
                  />
               </div>

               <div className="form-group input-password">
                  <label>Password</label>
                  <input
                     type={isShowPassword === true ? "text" : "password"}
                     className="form-control"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     onKeyDown={(event) => handlePressEnter(event)}
                  />
                  <i
                     className={
                        isShowPassword === true
                           ? "icons-eye fa-regular fa-eye"
                           : "icons-eye fa-regular fa-eye-slash"
                     }
                     onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
               </div>

               <div>
                  <button
                     className="btn-submit btn btn-dark"
                     onClick={() => handleLogin()}
                     disabled={
                        email && password && isLoading === false ? false : true
                     }
                  >
                     <span>
                        {isLoading && (
                           <i className="fa-solid fa-circle-notch fa-spin me-2"></i>
                        )}
                        Log in
                     </span>
                  </button>
               </div>
               <div className="text-center">
                  <span
                     className="back"
                     onClick={() => {
                        navigate("/");
                     }}
                  >
                     <i className="fa-solid fa-chevron-left"></i> Go back
                  </span>
               </div>
            </div>
         </div>
      </>
   );
};
export default Login;
