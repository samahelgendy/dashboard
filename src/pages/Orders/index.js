import './style.css'
import{Steps, Typography , Form , Input , Button , Select , Space , Table , Avatar , Rate } from 'antd';
import { LoginOutlined, ProfileOutlined} from '@ant-design/icons';
import { useState , useEffect } from 'react';
import { getOrders } from '../../Components/API';

function Orders (){
    const [current , setCurrent] = useState(0);
    const [loginDetails , setLoginDetails] = useState(null);
    const [profileDetails , setProfileDetails] = useState(null);

    const FinishLoginFrom = (values) =>{
        setLoginDetails(values);
        setCurrent(1)
    }

    const FinishDetailsFrom = (values) =>{
        setProfileDetails(values);
        setCurrent(2)
    }

    const form =[
        <LoginForm onFinish={FinishLoginFrom} /> ,
        <TableOrder onFinish={FinishDetailsFrom}/>
      ]
    const ConfirmDisabled = (isNumber)=>{
        if(isNumber === 0 ){
         return false;
        }else if(isNumber === 1){
         return loginDetails === null;
     }
    }
    return <div className='container' >
        
    <Steps current={current} onChange={setCurrent} style={{paddingTop:"70px"}} >
    <Steps.Step disabled={ConfirmDisabled(0)} title="Login" icon={<LoginOutlined />} />
    <Steps.Step disabled={ConfirmDisabled(1)} title="Recent Orders" icon={<ProfileOutlined />} />
    </Steps>
    {form[current]}
    </div>
  }

  function LoginForm ({onFinish }){
    return( 
       <Form autoComplete='off' onFinish={onFinish} labelCol={{span:10}} wrapperCol={{span:14}} className='form-login'>
         <Form.Item  label={<Typography.Text className='label'>Full Name</Typography.Text>} name={"fullName"} rules={[{
          required:true , 
          message:"please enter your full name"
         }, {
          whitespace:true , 
         },
         {
          min:3
         }
         
         ]}
         hasFeedback
         >
          <Input className='input' placeholder='please enter your name'/> 
         </Form.Item>
    
         <Form.Item  label={<Typography.Text className='label'>Email</Typography.Text>} name={"email"} rules={[{
          required:true , 
          type:"email",
          message:"please enter a valid email"
         }
         ]}
         hasFeedback
         >
          <Input className='input' placeholder='please enter a vaild email'/> 
         </Form.Item>
    
         <Form.Item  label={<Typography.Text className='label'>Password</Typography.Text>} name={"password"} rules={[{
          required:true , 
          message:"please enter your password"
         }
         ]}
         hasFeedback
         >
          <Input.Password className='inputpass' placeholder='please enter your password'/> 
         </Form.Item>
    
         <Form.Item  label={<Typography.Text className='label'>Confirm Password</Typography.Text>}  name={"confirmpassword"} dependencies={["password"]} rules={[{
          required:true , 
          message:"please enter your confirm password"
         },
          ({getFieldValue})=>({
            validator(_ , value){
              if(!value || getFieldValue("password") === value){
                 return Promise.resolve();
              }
              return Promise.reject("the two passwords you entered does not match")
            }
          })
         ]}
         hasFeedback
         >
          <Input.Password className='inputpass' placeholder='please enter your Confirm password'/> 
         </Form.Item>
         <Button className='btn-1' type="primary" htmlType="submit" block >Continue</Button>
      </Form>)
    }

    function TableOrder(){
        const [loading , setLoading] = useState(false);
        const [dataSource , setDataSource] =useState ([]);
        useEffect(()=>{
            setLoading(true);
            getOrders().then((res) => {
                setDataSource(res.products);
                setLoading(false);
            })
        } ,[])
        return(
         <Space direction='vertical'>
            <Typography.Title level={3}>Recent Orders</Typography.Title>
            <Table loading={loading} dataSource={dataSource} pagination={{pageSize:5}} columns={[
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
                title:"Quantity" , 
                dataIndex:"quantity",
                
            },
            {
                title:"Total" , 
                dataIndex:"total",
                render:(value)=>{
                    return <span>${value}</span>
                }
            }
    
        ]} >
    
            </Table>
         </Space>
        )
      }
  export default Orders;