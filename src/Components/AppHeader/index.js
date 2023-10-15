import {Image , Space ,Badge, Drawer, List} from 'antd';
import img from'../logo-footer.png';
import {BellOutlined, MailOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComments, getOrder } from '../API';

function AppHeader (){
    const [order , setOrder] = useState([]);
    const [comments , setComments] = useState([]);
    const [commentOpen , setCommentOpen] = useState(false);
    const [notifictionOpen , setNotifictionOpen] = useState(false);
    useEffect(()=>{
        getComments().then(res =>{
            setComments(res.comments)
            
        });
        getOrder().then(res =>{
            setOrder(res.products)
        });
    } , [])
    return( 
    <div className="AppHeader " >
    <div className="container ">
    <Image src={img} style={{width:"100px"}}></Image>
    <Space>
      <Badge onClick={()=>{setCommentOpen(true)}} count={comments.length} dot  >
      <MailOutlined  style={{fontSize:"24px"}}/>
      </Badge>
      <Badge onClick={()=>{setNotifictionOpen(true)}} count={order.length} >
      <BellOutlined style={{fontSize:"24px"}}/>
      </Badge>
    </Space>

    </div>
    <Drawer maskClosable title="Comment" open={commentOpen} onClose={()=>{setCommentOpen(false)}}>
        <List dataSource = {comments} renderItem ={(item)=>{
           return <List.Item>{item.body}</List.Item>
        }}></List>
    </Drawer>
    <Drawer maskClosable title="Notification" open={notifictionOpen} onClose={()=>{setNotifictionOpen(false)}}>
    <List dataSource = {order} renderItem ={(item)=>{
          return  <List.Item>{item.description}</List.Item>
        }}></List>
    </Drawer>
 </div>
)
    
}
export default AppHeader;