import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import GasAnalysis from "./pages/GasAnalysis";
import SmartSteel from "./pages/SmartSteel";
import CraneDispatch from "./pages/CraneDispatch";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import EquipmentInspection from "./pages/EquipmentInspection";
import MetallurgyAI from "./pages/MetallurgyAI";
import RollingControl from "./pages/RollingControl";
import ConverterOptimizer from "./pages/ConverterOptimizer";
import ProductionOptimizer from "./pages/ProductionOptimizer";
import PowerFireGuard from "./pages/PowerFireGuard";

const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
