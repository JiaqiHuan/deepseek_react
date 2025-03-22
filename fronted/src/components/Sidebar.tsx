import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
   min-width: 250px;
    min-height: 100vh;
  height: auto;
  background: #121212;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  &:hover {
    background: #1f1f1f;
  }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <h2>冶金控制系统</h2>
      <MenuItem to="/">🏠 首页</MenuItem>
      <MenuItem to="/metallurgy-ai">🧠 冶金大语言系统</MenuItem>
      <MenuItem to="/gas-analysis">🔥 烟气分析 & 炉温监测</MenuItem>
      <MenuItem to="/smart-steel">⚙️ 智能炼钢</MenuItem>
      <MenuItem to="/crane-dispatch">📊 无人天车调度系统</MenuItem>
      <MenuItem to="/equipment-inspection">🔍 设备与原材料检测系统</MenuItem>
      <MenuItem to="/rolling-control">🛠 轧制智能控制系统</MenuItem>
      <MenuItem to="/converter-optimizer">🔥 转炉精细模型控制系统</MenuItem>
      <MenuItem to="/production-optimizer">🧠 工厂智能排产系统</MenuItem>
      <MenuItem to="/power-fire-guard">🔥 电力火灾预防监测系统</MenuItem>    
    </SidebarContainer>
  );
}
