import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/route/admin.route";
import { userPaths } from "@/route/user.route";
import { SidebarNavigationGenerator } from "@/utilities/Sidebar.Generator";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

const Sidebar = () => {

  const user = useAppSelector(state=>state.user.user)
  
  const userRole = {
    ADMIN:'admin',
   USER:'user',
}

  let sidebarItems 

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = SidebarNavigationGenerator(adminPaths, user!.role)
      break;

    case userRole.USER:
      sidebarItems = SidebarNavigationGenerator(userPaths, user!.role)
      break;
  
    default:
      break;
  }
    
    return (
      <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="border-r-2 sidebar-bg min-h-[70vh]"
    >
      <div className="demo-logo-vertical" />
      <Menu
        // style={{backgroundColor:'white'}} 
        theme="light"
        className="pt-[2rem] font-semibold text-sm"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
    );
};

export default Sidebar;