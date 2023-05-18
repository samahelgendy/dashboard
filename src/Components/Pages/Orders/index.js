import { Space , Table  } from 'antd'
import { useEffect, useState } from 'react';
import {getOrders} from '../../API/index';
function Orders (){
  const[loading , setLoading] = useState(false);
  const[dataSource , setdataSource] = useState([]);
  useEffect( () =>{
    setLoading(true);
    getOrders().then( (res) => {
      setdataSource(res.products);
      setLoading(false)
    })
  } ,[] )
    return(
     <div className='container'>
              <Space size={20} direction="vertical">
    <h4>Orders</h4>
     <Table 
     loading={loading}
     columns={[
      
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
        title:"DiscountedPrice",
        dataIndex:"discountedPrice",
        render: (value) => <span>${value}</span>
       },
       {
        title:"Quantity",
        dataIndex:"quantity"
       },
       {
        title:"Total",
        dataIndex:"total"
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
export default Orders;