import { Typography , Table, Avatar } from "antd";
import { useState , useEffect } from "react";
import { getCustomers, getOrder } from "../../Components/API";
function Customers (){
    const [loading , setLoading] = useState(false);
    const [dataSource , setDataSource] =useState ([]);
    useEffect(()=>{
        setLoading(true);
        getCustomers().then((res) => {
            setDataSource(res.users);
            setLoading(false);
        })
    } ,[])
    return(
        <div className="container">
          <Typography.Title level={3} style={{paddingTop:"60px"}}>Customers</Typography.Title>
          <Table pagination={{pageSize:5}} dataSource={dataSource} loading={loading} columns={[
            {
             title:"Photo" , 
            dataIndex:"image",
            render:(link)=>{
                return <Avatar src={link} />
            }
            },
            {
            title:"First Name" , 
            dataIndex:"firstName"
          },
          {
            title:"Email" , 
            dataIndex:"email"
          }

          ]}>

          </Table>
        </div>
    )
}
export default Customers;
