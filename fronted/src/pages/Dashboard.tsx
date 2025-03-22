import styled from "styled-components";

// 📌 主页整体样式
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

// 📌 版块样式（PC 端分区排列，手机端纵向排列）
const Section = styled.div`
  margin-bottom: 30px;
  @media (min-width: 768px) {
    display: flex;
    gap: 20px;
  }
`;

// 📌 KPI 概览容器
const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

// 📌 每个 KPI 面板
const KPIBox = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: bold;
`;

// 📌 生产监控 & AI 推荐 & 新闻速递面板
const Panel = styled.div<{ bg?: string }>`
  flex: 1;
  padding: 20px;
  background: ${(props) => props.bg || "#fff"};
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;


// 📌 新闻列表样式
const NewsList = styled.ul`
  padding: 0;
  list-style: none;
`;

const NewsItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #f1f1f1;
  }
`;

// 📌 模拟新闻数据
const newsData = [
  { id: 1, title: "🔥 全球钢铁市场需求增长 5%", link: "#" },
  { id: 2, title: "⚙️ AI 赋能智能排产，提升 15% 效率", link: "#" },
  { id: 3, title: "🌱 低碳冶炼新突破，碳排放降低 10%", link: "#" },
];

export default function HomePage() {
  return (
    <Container>
      <h1>📊 系统概览</h1>

      {/* 1️⃣ 顶部概览面板（KPI） */}
      <KPIContainer>
        <KPIBox>📈 生产负荷: 80% / 100%</KPIBox>
        <KPIBox>📦 订单完成率: 75%</KPIBox>
        <KPIBox>🌍 碳排放: 1200吨</KPIBox>
        <KPIBox>♻️ 废钢回收率: 85%</KPIBox>
        <KPIBox>💰 钢材价格波动: +2.5%</KPIBox>
        <KPIBox>⚠️ 供应链预警: 无</KPIBox>
      </KPIContainer>

      {/* 2️⃣ 生产计划 & 进度监控 */}
      <Section>
        <Panel bg="#f1f3f5">
          <h2>📅 生产计划 & 进度监控</h2>
          <p>🔹 生产进度: 订单 1（80%），订单 2（45%）...</p>
          <p>⚙️ 关键瓶颈工序: 加热炉 - 负荷过高</p>
          <p>⏳ 能耗趋势: 每日能耗 1200kWh</p>
        </Panel>
      </Section>

      {/* 3️⃣ 知识图谱 & AI 推荐 */}
      <Section>
        <Panel bg="#e3f2fd">
          <h2>🤖 知识图谱 & AI 推荐</h2>
          <p>🔹 碳排放优化: 采用更节能方案，预计减少 5% 排放</p>
          <p>🔹 排产优化: AI 预测未来 3 天订单增长 10%</p>
          <p>🔹 供应链调整: 采购调整建议 - 提前采购铁矿石</p>
        </Panel>
      </Section>

      {/* 4️⃣ 新闻速递 */}
      <Section>
        <Panel bg="#fff3cd">
          <h2>📰 新闻速递</h2>
          <NewsList>
            {newsData.map((news) => (
              <NewsItem key={news.id} onClick={() => window.open(news.link, "_blank")}>
                {news.title}
              </NewsItem>
            ))}
          </NewsList>
        </Panel>
      </Section>
    </Container>
  );
}
