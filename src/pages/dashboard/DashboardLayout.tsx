import { Layout } from "antd";
// import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
const { Content} = Layout;
const DashboardLayout = () => {

  return (
    <Layout>
       <Sidebar />
    <Layout>
      {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
      <Content>
          <Outlet />
      </Content>
    </Layout>
  </Layout>
  );
};

export default DashboardLayout;
