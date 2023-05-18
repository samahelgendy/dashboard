import {BellFilled , MailOutlined} from '@ant-design/icons' ; 
import { Badge , Drawer, Image , Space , List  } from 'antd';
import { useEffect, useState } from 'react';
import {getComments , getOrders} from '../API/index'
function AppHeader () {
  const [comments , setComments] = useState([]);
  const [orders , setOrders] = useState([]);
  const [commentsOpen , setCommentsOpen] = useState(false);
  const [notifcationOpen , setNotifcationOpen] = useState(false);
  useEffect( () =>{
    getComments().then(res =>{
      setComments(res.comments);
    });
    getOrders().then(res =>{
      setOrders(res.products);
    });
  },[]);
    return(
      
<section>
<div className='container'>
         <div className='AppHeader'>
       <Image src='https://vid.alarabiya.net/images/2016/11/13/3a2b4450-4505-4ad4-ac74-db9c2303552f/3a2b4450-4505-4ad4-ac74-db9c2303552f_16x9_600x338.jpg' width={40}  borderRadius={6}>
       </Image>
       <Space>
       <Badge count={comments.length} dot>
         <MailOutlined style={ {fontSize:24}} onClick={() =>{
          setCommentsOpen(true)
         }} />
        </Badge>
        <Badge count={orders.length}>
            <BellFilled style={ {fontSize:24}} onClick={() =>{setNotifcationOpen(true)}} />
        </Badge>

       </Space>
       <Drawer title="Comments" 
       open={commentsOpen} 
       onClose={()=>{setCommentsOpen(false)}} 
       maskClosable>
         <List dataSource ={comments} renderItem={ (item) =>{
            return <List.Item>{item.body}</List.Item>
         }}></List>
       </Drawer>
       <Drawer title="Notifications" open={notifcationOpen} onClose={()=>{setNotifcationOpen(false)}}  maskClosable>
        <List dataSource={orders} renderItem={(item) =>{
          return <List.Item>{item.title}</List.Item>
        }}>

        </List>
       </Drawer>
       </div>
      </div>
</section>
    )
}

export default AppHeader ;