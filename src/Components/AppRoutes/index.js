import { Routes , Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Inventory from "../../pages/Inventor";
import Orders from "../../pages/Orders";
import Customers from "../../pages/Customers";
function AppRoutes (){
    return(
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="order" element={<Orders />} />
        <Route path="customer" element={<Customers />} />
      </Routes>
    )
}
export default AppRoutes;