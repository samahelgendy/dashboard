import {Avatar ,Rate, Space , Table  } from 'antd';
import { useEffect, useState } from 'react';
import {getInventory} from '../../API/index';
function Inventory (){
  const[loading , setLoading] = useState(false);
  const[dataSource , setdataSource] = useState([]);
  useEffect( () =>{
    setLoading(true);
    getInventory().then( (res) => {
      setdataSource(res.products);
      setLoading(false)
    })
  } ,[] )
    return(
      <div className='container'>
    <Space size={20} direction="vertical">  
    <h4>Inventory</h4>
     <Table 
     loading={loading}
     columns={[
      {
        title:"Thumbnail",
        dataIndex:"thumbnail",
        render:(link)=>{
        return <Avatar src={link} />
        }
       },
      {
       title:"Title",
       dataIndex:"title"
      },
      {
        title:"Price",
        dataIndex:"price",
        render: (value) => <span>${value}</span>
       },
       {
        title:"Rating",
        dataIndex:"rating",
        render:(rating) =>{
          return <Rate value={rating} allowHalf disabled />
        }
       },
       {
        title:"Stock",
        dataIndex:"stock"
       },
       {
        title:"Brand",
        dataIndex:"brand"
       },
      ]}
      dataSource ={dataSource}
      pagination={{
        pageSize : 5
      }}
      >

     </Table>
      </Space>
      </div>
    )
}
export default Inventory;