import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppHeader from './Components/AppHeader';
import {Space} from 'antd'
import SideMenu from './Components/SideMenu';
import PageContent from './Components/PageContent';
import AppFooter from './Components/AppFooter/indxe';
function App() {
  return (
    <div className="App">
      <AppHeader />
      <Space className='menuandpagecontent'>
        <SideMenu />
        <PageContent />
      </Space>
      <AppFooter />
      
    </div>
  );
}

export default App;
