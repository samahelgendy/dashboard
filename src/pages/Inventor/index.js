import {Avatar, Steps, Table, Typography , Space, Rate} from "antd"
import { useEffect, useState } from "react";
import {CheckCircleFilled, LoginOutlined, ProfileOutlined} from '@ant-design/icons';
import {getInventory} from "../../Components/API";
import './style.css';
function Inventory (){
    return(
        <div className='container Inventory' >
            <Typography.Title style={{marginBottom:"20px"}}  level={4}>Inventory</Typography.Title>
            <TableInventory />
       </div> 
    )
  }

  function TableInventory(){
    const [loading , setLoading] = useState(false);
    const [dataSource , setDataSource] =useState ([]);
    useEffect(()=>{
        setLoading(true);
        getInventory().then((res) => {
            setDataSource(res.products);
            setLoading(false);
        })
    } ,[])
    return(
     <Space >
        <Table loading={loading} dataSource={dataSource} pagination={{pageSize:5}} columns={[
        {
         title:"Image" , 
         dataIndex:"thumbnail",
         render:(Link)=>{
          return <Avatar src={Link} />
         }
        },
        {
            title:"Title" , 
            dataIndex:"title",
        },
        {
            title:"Price" , 
            dataIndex:"price",
            render:(value)=>{
                return <span>${value}</span>
            }
        },
        {
            title:"Rating" , 
            dataIndex:"rating",
            render:(value)=>{
                return <Rate value={value} allowHalf disabled/>
            }
        }

    ]} >

        </Table>
     </Space>
    )
  }
  export default Inventory;