import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  text-align: center;
  font-size: 18px;
  flex: 1;
`;

const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatusItem = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  padding: 15px;
  border-radius: 8px;
  color: white;
  flex: 1;
  margin: 0 10px;
  text-align: center;
  font-weight: bold;
`;

const CategoryGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CategoryCard = styled.div`
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
  min-width: 200px;

  &:hover {
    background: #e0e0e0;
  }

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>🏭 设备系统首页</h1>

      {/* 设备概览部分 */}
      <Overview>
        <Section>
          <h3>总设备数</h3>
          <p>100</p>
        </Section>
        <Section>
          <h3>在线设备</h3>
          <p>85</p>
        </Section>
        <Section>
          <h3>需维护设备</h3>
          <p>10</p>
        </Section>
        <Section>
          <h3>故障设备</h3>
          <p>5</p>
        </Section>
      </Overview>

      {/* 状态统计部分 */}
      <StatusBox>
        <StatusItem color="green">🟢 正常</StatusItem>
        <StatusItem color="yellow">🟡 需维护</StatusItem>
        <StatusItem color="red">🔴 故障</StatusItem>
      </StatusBox>

      {/* 设备分区展示部分 */}
      <h2>📌 设备分区</h2>
      <CategoryGrid>
        <CategoryCard onClick={() => navigate("/equipment/炼钢设备")}>
          <h3>🔥 炼钢设备</h3>
          <p>展示炼钢工艺设备，确保生产顺利进行。</p>
        </CategoryCard>
        <CategoryCard onClick={() => navigate("/equipment/热轧设备")}>
          <h3>🏭 热轧设备</h3>
          <p>包括轧钢、热处理、冷却等多项设备。</p>
        </CategoryCard>
        <CategoryCard onClick={() => navigate("/equipment/无人天车")}>
          <h3>🚛 无人天车</h3>
          <p>智能化天车系统，自动化搬运任务。</p>
        </CategoryCard>
        <CategoryCard onClick={() => navigate("/equipment/火灾预防设备")}>
          <h3>🔥 火灾预防</h3>
          <p>提供全方位的火灾监控和预防措施。</p>
        </CategoryCard>
      </CategoryGrid>
    </Container>
  );
}
