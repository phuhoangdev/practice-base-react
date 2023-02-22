import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import TableUsers from "../TableUsers";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route
               path="/users"
               element={
                  <PrivateRoute>
                     <TableUsers />
                  </PrivateRoute>
               }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </>
   );
};
export default AppRoutes;
