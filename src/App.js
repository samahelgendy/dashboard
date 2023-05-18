import {Space} from "antd";
import './App.css';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';
import PageContent from './Components/PageContent';
import AppRoutes from './Components/AppRoutes';
import SideMenu from './Components/SideMenu';

function App() {
  return (
    <div className="App">
     <AppHeader />
     <Space className="sideAndPage">
      <SideMenu></SideMenu>
      <PageContent></PageContent>
     </Space>
     <AppFooter />
    </div>
  );
}

export default App;
