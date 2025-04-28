import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


// 📌 侧边栏容器
const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "250px" : "60px")};
  min-width: ${(props) => (props.isOpen ? "250px" : "60px")};
  min-height: 100vh;
  background: #121212;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s;
  overflow: hidden;
`;

// 📌 折叠按钮
const ToggleButton = styled.button`
  background: #1f1f1f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 100%;
  border-radius: 3px;
  transition: 0.3s;

  &:hover {
    background: #1abc9c;
  }
`;

// 📌 菜单项
const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: 0.3s;

  &:hover {
    background: #1f1f1f;
  }
`;

// 📌 文字部分（折叠时隐藏）
const SidebarText = styled.span<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "inline" : "none")};
  margin-left: 10px;
`;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContainer isOpen={isOpen}>
      {/* 折叠按钮 */}
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </ToggleButton>

      <h2>冶金控制系统</h2>

      {/* 📌 设备系统导航 */}
      <MenuItem to="/">
        🏠 <SidebarText isOpen={isOpen}>首页</SidebarText>
      </MenuItem>
      <MenuItem to="/metallurgy-ai">
        🧠 <SidebarText isOpen={isOpen}>冶金大语言系统</SidebarText>
      </MenuItem>
      <MenuItem to="/gas-analysis">
        🔥 <SidebarText isOpen={isOpen}>烟气分析 & 炉温监测</SidebarText>
      </MenuItem>
      <MenuItem to="/smart-steel">
        ⚙️ <SidebarText isOpen={isOpen}>智能炼钢</SidebarText>
      </MenuItem>
      <MenuItem to="/crane-dispatch">
        📊 <SidebarText isOpen={isOpen}>无人天车调度系统</SidebarText>
      </MenuItem>
      <MenuItem to="/equipment-inspection">
        🔍 <SidebarText isOpen={isOpen}>设备与原材料检测系统</SidebarText>
      </MenuItem>
      <MenuItem to="/rolling-control">
        🛠 <SidebarText isOpen={isOpen}>轧制智能控制系统</SidebarText>
      </MenuItem>
      <MenuItem to="/converter-optimizer">
        🔥 <SidebarText isOpen={isOpen}>转炉精细模型控制系统</SidebarText>
      </MenuItem>
      <MenuItem to="/production-optimizer">
        🧠 <SidebarText isOpen={isOpen}>工厂智能排产系统</SidebarText>
      </MenuItem>
      <MenuItem to="/power-fire-guard">
        🔥 <SidebarText isOpen={isOpen}>电力火灾预防监测系统</SidebarText>
      </MenuItem>
      <MenuItem to="/equipment/Dashboard">
        🛠️ <SidebarText isOpen={isOpen}>设备管理</SidebarText>
      </MenuItem>
    </SidebarContainer>
  );
}
