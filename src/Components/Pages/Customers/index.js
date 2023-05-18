import {Avatar , Space , Table  } from 'antd'

import { useEffect, useState } from 'react';
import {getCustomers} from '../../API/index';
function Inventory (){
  const[loading , setLoading] = useState(false);
  const[dataSource , setdataSource] = useState([]);
  useEffect( () =>{
    setLoading(true);
    getCustomers().then( (res) => {
      setdataSource(res.users);
      setLoading(false)
    })
  } ,[] )
    return(
      <div className='container'>
      <Space size={20} direction="vertical">
    <h4>Customers</h4>
    
     <Table 
     loading={loading}
     columns={[
      {
        title:"Photo",
        dataIndex:"image",
        render:(link)=>{
        return <Avatar src={link} />
        }
       },
      {
       title:"FirstName",
       dataIndex:"firstName"
      },
      {
        title:"LastName",
        dataIndex:"lastName",
        
       },
       {
        title:"Phone",
        dataIndex:"phone",

       },
       {
        title:"Email",
        dataIndex:"email"
       },
       {
        title:"Address",
        dataIndex:"address",
      render: (address) =>{
      return <span>{address.address} , {address.city}</span>
      }
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