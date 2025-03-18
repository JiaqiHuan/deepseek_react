import { useState } from "react";
import styled from "styled-components";

// 📌 组件样式
const Container = styled.div`
  padding: 20px;
  color: black;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: #f4f4f4;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #333;
`;

const Description = styled.p`
  color: #666;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  margin-top: 10px;
`;

const DataBox = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function ConverterControl() {
  const [selectedSteel, setSelectedSteel] = useState("Q235");

  return (
    <Container>
      <h1>🔥 转炉精细模型控制系统</h1>

      {/* 📊 1️⃣ 数据监控面板 */}
      <Section>
        <Title>📊 数据监控面板</Title>
        <Description>实时监测冶炼数据，并提供 AI 优化建议。</Description>

        {/* 选择钢种 */}
        <Select onChange={(e) => setSelectedSteel(e.target.value)}>
          <option value="Q235">Q235</option>
          <option value="Q345">Q345</option>
          <option value="304SS">304 不锈钢</option>
        </Select>

        {/* 关键冶炼数据 */}
        <DataBox>
          <p>当前钢种: {selectedSteel}</p>
          <p>吹炼氧气流量: 1200 Nm³/h</p>
          <p>终点碳含量: 0.04%</p>
          <p>副枪测温: 1650 ℃</p>
        </DataBox>
      </Section>

      {/* 📈 2️⃣ 生产趋势分析 */}
      <Section>
        <Title>📈 生产趋势分析</Title>
        <Description>分析钢种历史参数，展示冶炼趋势。</Description>
        <DataBox>
          <p>历史合格率趋势: 📈 92% → 95%</p>
          <p>AI vs. 传统工艺优化对比</p>
        </DataBox>
      </Section>

      {/* 🧠 3️⃣ 知识图谱 & 专家系统 */}
      <Section>
        <Title>🧠 知识图谱 & 专家系统</Title>
        <Description>可视化冶炼路径，结合专家经验优化工艺。</Description>
        <DataBox>
          <p>钢种基因图谱：可交互知识图谱</p>
          <p>AI 解析最佳吹炼路径</p>
        </DataBox>
      </Section>

      {/* 🔁 4️⃣ 数字孪生模拟 */}
      <Section>
        <Title>🔁 数字孪生模拟</Title>
        <Description>模拟冶炼过程，提供 AI 预测与仿真数据。</Description>
        <DataBox>
          <p>3D 模拟工艺参数变化</p>
          <p>历史数据 vs. 预测数据对比</p>
        </DataBox>
      </Section>

      {/* 📡 5️⃣ 接口对接 & 设备连接 */}
      <Section>
        <Title>📡 接口对接 & 设备连接</Title>
        <Description>展示当前控制指令与数据交互情况。</Description>
        <DataBox>
          <p>当前设备指令状态：🔵 运行中</p>
          <p>传输协议：MODBUS / OPC-UA</p>
        </DataBox>
      </Section>
    </Container>
  );
}
