import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 📌 页面容器
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 📌 标题样式
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

// 📌 宫格容器
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px; /* 增大间距 */
  width: 100%;
  max-width: 400px; /* 限制最大宽度 */
`;

// 📌 每个功能块
const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background: #e0e0e0;
    transform: scale(1.05);
  }
`;

// 📌 图标样式
const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

// 📌 文本样式
const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

// 📌 页面数据
const features = [
  { name: "智能冶金", path: "/smart-steel", icon: "/icons/steel.png" },
  { name: "气体分析", path: "/gas-analysis", icon: "/icons/gas.png" },
  { name: "行车调度", path: "/crane-dispatch", icon: "/icons/crane.png" },
  { name: "设备巡检", path: "/equipment-inspection", icon: "/icons/inspection.png" },
  { name: "冶金 AI", path: "/metallurgy-ai", icon: "/icons/ai.png" },
  { name: "轧制控制", path: "/rolling-control", icon: "/icons/rolling.png" },
  { name: "转炉优化", path: "/converter-optimizer", icon: "/icons/converter.png" },
  { name: "生产优化", path: "/production-optimizer", icon: "/icons/production.png" },
  { name: "电力火灾监测", path: "/power-fire-guard", icon: "/icons/fire.png" },
];

export default function MobileHome() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Title>📌 请选择功能</Title>
      <GridContainer>
        {features.map((feature) => (
          <FeatureCard key={feature.path} onClick={() => navigate(feature.path)}>
            <Icon src={feature.icon} alt={feature.name} />
            <Label>{feature.name}</Label>
          </FeatureCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
}
