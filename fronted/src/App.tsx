import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar"; // 📌 新增移动端导航栏
import Dashboard from "./pages/Dashboard";
import GasAnalysis from "./pages/GasAnalysis";
import SmartSteel from "./pages/SmartSteel";
import CraneDispatch from "./pages/CraneDispatch";
import EquipmentInspection from "./pages/EquipmentInspection";
import MetallurgyAI from "./pages/MetallurgyAI";
import RollingControl from "./pages/RollingControl";
import ConverterOptimizer from "./pages/ConverterOptimizer";
import ProductionOptimizer from "./pages/ProductionOptimizer";
import PowerFireGuard from "./pages/PowerFireGuard";
import MobileHome from "./pages/MobileHome";

// 📌 PC 布局
const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;
const MobileContentWrapper = styled.div`
  padding-top: 60px; /* 确保内容不会被 Navbar 盖住 */
`;

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Router>
      {isMobile ? (
        // 📱 手机端：带顶部导航栏的 APP 风格首页
        <>
          <MobileNavbar /> {/* 📌 添加移动端导航栏 */}
          <MobileContentWrapper>
          <Routes>
            <Route path="/" element={<MobileHome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gas-analysis" element={<GasAnalysis />} />
            <Route path="/smart-steel" element={<SmartSteel />} />
            <Route path="/crane-dispatch" element={<CraneDispatch />} />
            <Route path="/equipment-inspection" element={<EquipmentInspection />} />
            <Route path="/metallurgy-ai" element={<MetallurgyAI />} />
            <Route path="/rolling-control" element={<RollingControl />} />
            <Route path="/converter-optimizer" element={<ConverterOptimizer />} />
            <Route path="/production-optimizer" element={<ProductionOptimizer />} />
            <Route path="/power-fire-guard" element={<PowerFireGuard />} />
          </Routes>
          </MobileContentWrapper>
        </>
      ) : (
        // 💻 PC 端：标准布局
        <Layout>
          <Sidebar />
          <Content>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/gas-analysis" element={<GasAnalysis />} />
              <Route path="/smart-steel" element={<SmartSteel />} />
              <Route path="/crane-dispatch" element={<CraneDispatch />} />
              <Route path="/equipment-inspection" element={<EquipmentInspection />} />
              <Route path="/metallurgy-ai" element={<MetallurgyAI />} />
              <Route path="/rolling-control" element={<RollingControl />} />
              <Route path="/converter-optimizer" element={<ConverterOptimizer />} />
              <Route path="/production-optimizer" element={<ProductionOptimizer />} />
              <Route path="/power-fire-guard" element={<PowerFireGuard />} />
            </Routes>
          </Content>
        </Layout>
      )}
    </Router>
  );
}
