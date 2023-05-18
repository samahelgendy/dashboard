import {Space , Card , Statistic, Table  } from 'antd'
import { ShopOutlined  , DollarCircleFilled , ShoppingCartOutlined , UserAddOutlined} from '@ant-design/icons' ;
import { useEffect, useState } from 'react';
import {getOrders , getRevenu , getInventory , getCustomers} from '../../API/index';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function Dashboard (){
  const [order , setOrder] = useState(0);
  const [inventory , setInventory] = useState(0);
  const [customers , setCustomers] = useState(0);
  const [revenu , setRevenue] = useState(0);

  useEffect( () =>{
      getOrders().then( (res) =>{
        setOrder(res.total)
      });
      getInventory().then( (res) =>{
        setInventory(res.total)
      });
      getCustomers().then( (res) =>{
        setCustomers(res.total)
      });
      getRevenu().then( (res) =>{
        setRevenue(res.total)
      });
  } , [])
    return(
      <div className='container'>
    <h4>Dashboard</h4>
      <Space direction='horizontal'>
         <DashboardCard icon={<ShoppingCartOutlined style={{
          color:"green" , 
          backgroundColor:"rgba(0, 128, 0, 0.326)",
          borderRadius:20 , 
          padding:8,
          fontSize:24

         }}/>} title={"Orders"} value={order} />
         <DashboardCard icon={<ShopOutlined style={{
          color:"green" , 
          backgroundColor:"rgba(0, 128, 0, 0.326)",
          borderRadius:20 , 
          padding:8,
          fontSize:24

         }}/>} title={"Inventory"} value={inventory} />
         <DashboardCard icon={<UserAddOutlined style={{
          color:"green" , 
          backgroundColor:"rgba(0, 128, 0, 0.326)",
          borderRadius:20 , 
          padding:8,
          fontSize:24

         }}/>} title={"Customers"} value={customers} />
         <DashboardCard icon={<DollarCircleFilled style={{
          color:"green" , 
          backgroundColor:"rgba(0, 128, 0, 0.326)",
          borderRadius:20 , 
          padding:8,
          fontSize:24

         }} />} title={"Revenue"} value={revenu} />
      </Space>

      <Space>
        <RecentOrders />
      </Space>
      <Space>
      <DashboardChart />
      </Space>
      </div>
    )
}

function DashboardCard ({title , value , icon}){
  
  return(
    
    <Card >
      
    <Space>
      {icon}
      <Statistic title={title} value={value} />
    </Space>
  </Card>
  )
}
function RecentOrders (){
  const [dataSource , setDataSource] = useState([]);
  const [loading , setLoading] = useState(false);
  useEffect( ()=>{
     setLoading(true);
    
     getOrders().then( (res) =>{
      setDataSource(res.products.splice(0 , 3));
      setLoading(false);
     })
  } ,[])
  return(
      <>
      <h5 className='mt-3 mb-3'>Recent Orders</h5>

<Table 
    columns={[
      {
      title:"Title",
      dataIndex:"title"
     },
     {
      title:"Quantity",
      dataIndex:"quantity"
     },
     {
      title:"Price",
      dataIndex:"discountedPrice"
     },
     {
      title:"Total",
      dataIndex:"total"
     },

    ]}
    loading={loading}
    dataSource={dataSource}
    pagination={false}
    >
      
    </Table>

      </>
  )
}

function DashboardChart(){
  const [revenu , setRevenue] = useState({
    datasets:[],
    labels:[]
  })
  useEffect( () =>{
    getRevenu().then( (res) =>{
      const labels = res.carts.map( (cart) =>{
        return `User-${cart.userId}`;
      });

      const data = res.carts.map( (cart) =>{
        return cart.userId;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label:"Reverse",
            data:data,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },

        ],
      
      };
      setRevenue(dataSource)
    });

    
  } , [])
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Revenu',
      },
    },
  };
  

    return <Card style={{width:600 , height:300 , marginTop:40 , marginBottom:80}}><Bar options={options} data={revenu} /></Card>;
  
}
export default Dashboard;