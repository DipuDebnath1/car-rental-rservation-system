import { adminPaths } from "@/route/admin.route";
import { userPaths } from "@/route/user.route";
import { SidebarNavigationGenerator } from "@/utilities/Sidebar.Generator";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

const Sidebar = () => {

  const role = 'user'

  const userRole = {
    ADMIN:'admin',
    USER:'user',
}

  let sidebarItems 

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = SidebarNavigationGenerator(adminPaths, userRole.ADMIN)
      break;

    case userRole.USER:
      sidebarItems = SidebarNavigationGenerator(userPaths, userRole.USER)
      break;
  
    default:
      break;
  }
    
    return (
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
        className="border-r-2"
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light"
        className="pt-[2rem] bg-white" 
        mode="inline" 
        defaultSelectedKeys={['4']} 
        items={sidebarItems} />
      </Sider>
    );
};

export default Sidebar;