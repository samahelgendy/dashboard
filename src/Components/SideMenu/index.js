import { DashboardFilled, MenuOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu , Drawer ,Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SideMenu (){
    const [menuOpen , setMenuOpen] = useState(false);
    return <div className="SideMenu">
        <MenuOutlined className="MenuIcon" onClick={()=>{setMenuOpen(true)}}/>
        <Drawer  open={menuOpen} onClose={()=>{setMenuOpen(false)}}>
            <AppMenu />
            <Button className="drawerbtn" type="primary" onClick={()=>{setMenuOpen(false)}}>Close</Button>
        </Drawer>
        <span className="HeaderMenu">
        <AppMenu  />
        </span>
     
   </div>
}
 
function AppMenu (){
    const navigate = useNavigate();
    return(
        <Menu mode='vertical' style={{height:"100vh" , paddingTop:"50px"}} onClick={(item)=>{
            navigate(item.key);
        }} items={[{
            label:"Dashboard" , 
            key:"/" ,
            icon:<DashboardFilled />
        },
        {
            label:"Inventory" , 
            key:"inventory" , 
            icon:<ShopOutlined />
        },
        {
            label:"Orders" , 
            key:"order" , 
            icon:<ShoppingCartOutlined />
        },
        {
            label:"Customers" , 
            key:"customer" , 
            icon:<UserOutlined />
        }
        ]} />
    )
}

export default SideMenu;