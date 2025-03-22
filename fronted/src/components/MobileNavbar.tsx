import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import { useState, useRef, useEffect } from "react";

// 📌 顶部导航栏
const NavbarContainer = styled.nav`
  background-color: ${theme.colors.card};
  height: 50px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.shadow};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

// 📌 Logo 样式
const Logo = styled.h1`
  color: ${theme.colors.neonBlue};
  font-size: 20px;
  text-shadow: 0 0 5px ${theme.colors.neonBlue};
`;

// 📌 右侧菜单按钮
const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  left: -25px;  /* 👈 让按钮向左移动 5px */
  &:hover {
    color: ${theme.colors.neonBlue};
  }
`;

// 📌 下拉菜单（动画优化）
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: 15px;
  background: ${theme.colors.card};
  box-shadow: ${theme.shadow};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

// 📌 菜单项样式
const MenuItem = styled(Link)`
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: ${theme.colors.neonBlue};
    border-radius: 5px;
  }
`;

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 📌 监听点击事件，判断是否点击了菜单外部
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavbarContainer>
      <Logo>冶金系统</Logo>

      {/* 📌 右侧导航菜单 */}
      <div style={{ position: "relative" }} ref={menuRef}>
        <MenuButton onClick={() => setMenuOpen((prev) => !prev)}>☰</MenuButton>
        <DropdownMenu isOpen={menuOpen}>
          <MenuItem to="/">🏠 首页</MenuItem>
          <MenuItem to="/smart-steel">🔥 智能冶金</MenuItem>
          <MenuItem to="/gas-analysis">💨 气体分析</MenuItem>
          <MenuItem to="/crane-dispatch">🚛 行车调度</MenuItem>
          <MenuItem to="/equipment-inspection">🔍 设备巡检</MenuItem>
          <MenuItem to="/metallurgy-ai">🤖 冶金 AI</MenuItem>
          <MenuItem to="/rolling-control">⚙️ 轧制控制</MenuItem>
          <MenuItem to="/converter-optimizer">🛠️ 转炉优化</MenuItem>
          <MenuItem to="/production-optimizer">📊 生产优化</MenuItem>
          <MenuItem to="/power-fire-guard">⚡ 电力火灾监测</MenuItem>
        </DropdownMenu>
      </div>
    </NavbarContainer>
  );
}
