import {Badge  , Space , Typography}from "antd";
import { MailOutlined} from '@ant-design/icons' ;
import './style.css'

function AppFooter () {
    return(
       <div className ="AppFooter">
           <div className="container">
        <div className="row">
            <div className="pay col-lg-2 col-md-6 col-sm-12">
                <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://web.telegram.org/z/" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://web.telegram.org/z/" target="_blank"><i className="fa-brands fa-telegram"></i></a>
                <a target="_blank" href="https://www.un-web.com/tools/whatsapp_link/?gclid=CjwKCAjw9J2iBhBPEiwAErwpeVyz3KrK9PkCELc4Rka4XqXIGBX1a0Ju9Ke5HTYti-RZ5OmbtcucFRoCyFAQAvD_BwE"><i className="fa-solid fa-comments"></i></a>
             </div>
            <div className="phone col-lg-2 col-md-6 col-sm-12 ">
             <Typography.Link href="tel:+01097226321" className="block mb-2">+021097226321</Typography.Link>
             <Typography.Link href="tel:+01121134566" className="block">+021121134566</Typography.Link>
            </div>
            <div className="email col-lg-2 col-md-6 col-sm-12">
              <div className="email_1 mb-2">
              <Space>
               <Badge >
                    <MailOutlined style={ {fontSize:20}} />
             </Badge>
            </Space>
                <a className="ms-2" href="/https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" target="_blank">samah@gmail.com</a>
              </div>

              <div className="email_2">
              <Space>
               <Badge >
                    <MailOutlined style={ {fontSize:20}} />
             </Badge>
            </Space>
                <a className="ms-2" href="/https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" target="_blank">samah@gmail.com</a>
                
              </div>
            </div>
        </div>
    </div>
       </div>
    )
}

export default AppFooter;