import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
  padding: 20px;
`;

const NavButton = styled.button`
  padding: 15px;
  font-size: 18px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const pages = [
  { name: "智能冶金", path: "/smart-steel" },
  { name: "气体分析", path: "/gas-analysis" },
  { name: "行车调度", path: "/crane-dispatch" },
  { name: "设备巡检", path: "/equipment-inspection" },
  { name: "冶金 AI", path: "/metallurgy-ai" },
  { name: "轧制控制", path: "/rolling-control" },
  { name: "转炉优化", path: "/converter-optimizer" },
  { name: "生产优化", path: "/production-optimizer" },
  { name: "电力火灾监测", path: "/power-fire-guard" },
];

export default function MobileNav() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <h2>📌 请选择功能</h2>
      {pages.map((page) => (
        <NavButton key={page.path} onClick={() => navigate(page.path)}>
          {page.name}
        </NavButton>
      ))}
    </NavContainer>
  );
}
