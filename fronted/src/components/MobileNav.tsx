import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 📌 导航容器
const NavContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 📌 菜单按钮样式
const MenuButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #0056b3;
  }
`;

// 📌 菜单内容（默认隐藏，点击后展开）
const MenuList = styled.div<{ open: boolean }>`
  background: white;
  position: absolute;
  bottom: 60px;
  width: 200px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.open ? "block" : "none")};
  padding: 10px;
`;


const MenuItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  background: #f8f9fa;
  text-align: center;
  cursor: pointer;
  margin-bottom: 5px;
  transition: 0.3s;

  &:hover {
    background: #e2e6ea;
  }
`;

const pages = [
  { name: "🏭 智能冶金", path: "/smart-steel" },
  { name: "🌡 气体分析", path: "/gas-analysis" },
  { name: "🚜 行车调度", path: "/crane-dispatch" },
  { name: "🛠 设备巡检", path: "/equipment-inspection" },
  { name: "🧠 冶金 AI", path: "/metallurgy-ai" },
  { name: "🔧 轧制控制", path: "/rolling-control" },
  { name: "🔥 转炉优化", path: "/converter-optimizer" },
  { name: "📈 生产优化", path: "/production-optimizer" },
  { name: "⚡ 电力火灾监测", path: "/power-fire-guard" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <NavContainer>
      {/* 菜单按钮 */}
      <MenuButton onClick={() => setIsOpen(!isOpen)}>☰</MenuButton>

      {/* 菜单选项 */}
      <MenuList open={isOpen}>
        {pages.map((page) => (
          <MenuItem key={page.path} onClick={() => navigate(page.path)}>
            {page.name}
          </MenuItem>
        ))}
      </MenuList>
    </NavContainer>
  );
}
