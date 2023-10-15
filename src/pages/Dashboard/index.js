import { DollarCircleOutlined, ShopOutlined, ShoppingCartOutlined, UserAddOutlined } from "@ant-design/icons";
import { Card, Statistic ,Space, Typography, Table, Pagination, List } from "antd";
import './style.css';
import { useEffect, useState } from "react";
import { getCustomers, getOrder, getRevenue } from "../../Components/API";
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
    const [revenue , setRevenue] = useState(0);
    useEffect(()=>{
        getOrder().then((res) =>{
         setOrder(res.total)
         setInventory(res.total)
        })
        getCustomers().then((res) =>{
          setCustomers(res.total)
        });
        getRevenue().then((res) =>{
            setRevenue(res.total);
          })
    } , [])
    return(
        <div className="container dash">
         <Typography.Title className="TitleDash" level={3} style={{marginTop:"20px"}}>Dashboard</Typography.Title>
          <div className="Content-dash">
          <DashboardCard  title={"Orders"}  value={order} icon={<ShoppingCartOutlined className="IconDash"
           style={{color:"green",backgroundColor:"rgba(0, 128, 0, 0.221)"}} />}  />
          <DashboardCard  title={"Inventory"}  value={inventory} icon={<ShopOutlined className="IconDash" 
          style={{color:"rgb(241, 97, 97)", backgroundColor:"rgba(241, 97, 97, 0.346)"}}  />}   />
          <DashboardCard  title={"Customers"}  value={customers} icon={<UserAddOutlined  className="IconDash" 
          style={{color:"blueviolet", backgroundColor:"rgba(137, 43, 226, 0.247)"}}/>}  />
          <DashboardCard  title={"Revenue"}  value={revenue} icon={<DollarCircleOutlined className="IconDash"
           style={{color:"palevioletred", backgroundColor:"rgba(216, 112, 147, 0.319)"}} />}  />
          </div>
          <DashTable />
          <Space className="ChartCard">
          <DishboardChart  />
          </Space>
          
        </div>
    )
  }

  function DashboardCard({title , value , icon} ){
    return(

      <Space  className="SpaceCard">
    <Card >
        <Space direction="horizatioal">
            {icon}
           <Statistic title={title} value={value} />
       </Space>
     </Card>
    </Space>  

    )
  }

  function DashTable (){
    const [dataSource , setDatasource] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        getOrder().then(res =>{
            setLoading(true);
            setDatasource(res.products.splice(0 , 5));
            setLoading(false);
        })
    } , [])
    return(
        <div className="container">
        <Typography.Title level={4} style={{textAlign:"center"}}>Recent Orders</Typography.Title>
        <Table  columns={[
        {
          title:"id",
          dataIndex:"id"
        },
        {
            title:"Title",
            dataIndex:"title"
        },
        {
            title:"Price",
            dataIndex:"price"
        },
        ]}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        ></Table>
        </div>
    )
  }
  function DishboardChart(){
    const [revenusData , setRevenusData] = useState({ labels:[], datasets:[] });

        useEffect(()=>{
            getRevenue().then(res =>{
                const labels = res.carts.map((cart)=>{
                  return `User-${cart.userId}`;
                })
                const data = res.carts.map((cart)=>{
                    return cart.discountedTotal; 
                  });
                  const dataSource = {
                    labels,
                    datasets: [
                      {
                        label: 'Revenu',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132)',
                      },
            
                    ],
                  }; 
                  setRevenusData(dataSource)
            })
        } , [])
        const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom' ,
          },
          title: {
            display: true,
            text: 'Revenue',
          },
        },
      };
  
    return <div className="container chart">
        <Bar options={options} data={revenusData} />;
    </div>
  }
  export default Dashboard;