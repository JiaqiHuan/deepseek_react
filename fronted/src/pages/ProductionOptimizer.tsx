import{ useState, useEffect } from 'react';
//import styled from 'styled-components';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ScatterChart, Scatter, CartesianGrid
} from 'recharts';

import { Container, ChartsContainer,ChartBox,Table,Th,Td} from "../styles";


// 📌 示例数据
const externalData = [
  { name: '2023-03-01', coalPrice: 150, ironOrePrice: 100, carbonPrice: 50, demandPolicy: 20, warehouseOrders: 300 },
  { name: '2023-03-02', coalPrice: 155, ironOrePrice: 105, carbonPrice: 52, demandPolicy: 21, warehouseOrders: 310 },
  { name: '2023-03-03', coalPrice: 160, ironOrePrice: 108, carbonPrice: 53, demandPolicy: 22, warehouseOrders: 320 },
  { name: '2023-03-04', coalPrice: 158, ironOrePrice: 106, carbonPrice: 55, demandPolicy: 23, warehouseOrders: 330 },
];

const productionData = [
  { time: '2023-03-01', productionPriority: 60, energyUsage: 80, wasteSteelRecovery: 90 },
  { time: '2023-03-02', productionPriority: 65, energyUsage: 85, wasteSteelRecovery: 92 },
  { time: '2023-03-03', productionPriority: 68, energyUsage: 90, wasteSteelRecovery: 93 },
  { time: '2023-03-04', productionPriority: 70, energyUsage: 92, wasteSteelRecovery: 95 },
];

// 📌 主组件
export default function FactorySchedulingSystem() {
  const [data, setData] = useState(externalData);

  useEffect(() => {
    // 实时数据更新的模拟
    const interval = setInterval(() => {
      setData(prevData => [
        ...prevData.slice(1),
        {
          name: `2023-03-${prevData.length + 1}`,
          coalPrice: Math.random() * 20 + 150,
          ironOrePrice: Math.random() * 10 + 100,
          carbonPrice: Math.random() * 5 + 50,
          demandPolicy: Math.random() * 5 + 20,
          warehouseOrders: Math.random() * 50 + 300
        }
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>工厂智能排产系统</h1>

      {/* 🔥 数据展示区域 */}
      {/* <Section> */}
        <h2>📊 外部数据波动监控</h2>
        <ChartsContainer>
          {/* 大宗商品价格波动图 */}
          <ChartBox>
            <h3>大宗商品价格波动</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="coalPrice" stroke="blue" name="煤炭价格" />
                <Line type="monotone" dataKey="ironOrePrice" stroke="green" name="铁矿石价格" />
                <Line type="monotone" dataKey="carbonPrice" stroke="red" name="碳排放价格" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* 需求端政策变化与云仓订单 */}
          <ChartBox>
            <h3>需求端政策变化 & 云仓订单</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demandPolicy" fill="orange" name="政策变化" />
                <Bar dataKey="warehouseOrders" fill="purple" name="云仓订单" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </ChartsContainer>
      {/* </Section> */}

      {/* 📈 生产趋势分析 */}
      {/* <Section> */}
        <h2>📈 内部数据监控</h2>
        <ChartsContainer>
          {/* 排产计划 */}
          <ChartBox>
            <h3>生产优先级 & 能源监控</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={productionData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="productionPriority" stroke="blue" name="生产优先级" />
                <Line type="monotone" dataKey="energyUsage" stroke="green" name="能源使用" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* 废钢回收与分级数据 */}
          <ChartBox>
            <h3>废钢回收与分级数据</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productionData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wasteSteelRecovery" fill="orange" name="废钢回收率" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </ChartsContainer>
      {/* </Section> */}

      {/* 🧠 知识图谱 */}
      {/* <Section> */}
        <h2>📚 知识图谱 & 专家系统</h2>
        <ChartBox>
          <h3>废钢回收与工序衔接</h3>
          <p>通过知识图谱挖掘潜在优化点，提升废钢回收与生产流程的关联性。</p>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="回收率" />
              <YAxis type="number" dataKey="y" name="工序优化" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="废钢回收" data={[{ x: 60, y: 80 }, { x: 75, y: 85 }, { x: 85, y: 90 }]} fill="red" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartBox>
      {/* </Section> */}

      {/* 🔁 碳排放溯源与精益管控 */}
      {/* <Section> */}
        <h2>🔁 碳排放溯源与精益管控</h2>
        <ChartsContainer>
          {/* 碳排放趋势 */}
          <ChartBox>
            <h3>碳排放趋势分析</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={productionData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="energyUsage" stroke="green" name="能源使用" />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* 精益管控仪表盘 */}
          <ChartBox>
            <h3>生产班组效率 & 综合利润</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productionData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productionPriority" fill="blue" name="生产优先级" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </ChartsContainer>
      {/* </Section> */}

      {/* 表格显示生产数据 */}
      {/* <Section> */}
        <h2>生产决策与优化目标</h2>
        <Table>
          <thead>
            <tr>
              <Th>日期</Th>
              <Th>减员目标</Th>
              <Th>综合利润提升</Th>
              <Th>碳耗变化</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>2023-03-01</Td>
              <Td>已完成 50%</Td>
              <Td>提升 10%</Td>
              <Td>降低 5%</Td>
            </tr>
            <tr>
              <Td>2023-03-02</Td>
              <Td>已完成 60%</Td>
              <Td>提升 12%</Td>
              <Td>降低 7%</Td>
            </tr>
            <tr>
              <Td>2023-03-03</Td>
              <Td>已完成 70%</Td>
              <Td>提升 15%</Td>
              <Td>降低 8%</Td>
            </tr>
          </tbody>
        </Table>
      {/* </Section> */}
    </Container>
  );
}
