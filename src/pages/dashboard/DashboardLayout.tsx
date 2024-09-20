import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/shared-components/Loading";
const { Content } = Layout;
const DashboardLayout = () => {
  const loading = useAppSelector((state) => state.user.loading);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout>
          <Content className="bg-white ">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
