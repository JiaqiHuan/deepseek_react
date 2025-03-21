import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import GasAnalysis from "./pages/GasAnalysis";
import SmartSteel from "./pages/SmartSteel";
import CraneDispatch from "./pages/CraneDispatch";
import Navbar from "./components/Navbar";
import EquipmentInspection from "./pages/EquipmentInspection";
import MetallurgyAI from "./pages/MetallurgyAI";
import RollingControl from "./pages/RollingControl";
import ConverterOptimizer from "./pages/ConverterOptimizer";
import ProductionOptimizer from "./pages/ProductionOptimizer";
import PowerFireGuard from "./pages/PowerFireGuard";
import MobileHome from "./pages/MobileHome"; // 新增手机端首页
import { useState, useEffect } from "react";
import styled from "styled-components";

// 📌 适配不同设备
const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 判断是否为手机端

  // 监听窗口变化，动态适配
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {isMobile ? (
        // 📱 手机端：首页是 APP 风格导航
        <Routes>
          <Route path="/" element={<MobileHome />} />
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
      ) : (
        // 💻 PC 端：正常布局
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
