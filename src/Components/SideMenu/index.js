import {Menu} from 'antd'
import {AppstoreAddOutlined , ShopOutlined , ShoppingCartOutlined , UserAddOutlined} from '@ant-design/icons' ;
import {useNavigate , useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
function SideMenu () {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectKeys , setSelectKeys] = useState('./');
   
    useEffect( () =>{
        const pathName =location.pathname; 
        setSelectKeys(pathName);
    } ,[location.pathname] )
    return(
       <div className="SideMenu ">
       <Menu
               onClick={ (item) =>{
                      navigate(item.key);
               }}
               selectKeys ={[selectKeys ]}
               items ={[
                {
                  label:"Dashboard",
                  key:"/" , 
                  icon: <AppstoreAddOutlined />
                } , 
                {
                    label:"Inventory",
                    key:"/inventory" , 
                    icon: <ShopOutlined />
                },
                {
                    label:"Orders",
                    key:"/orders" , 
                    icon: <ShoppingCartOutlined />
                },
                {
                    label:"Customers",
                    key:"/customers",
                    icon: <UserAddOutlined />
                }
            ]
            }
       >

       </Menu>
       </div>
    )
}

export default SideMenu ;