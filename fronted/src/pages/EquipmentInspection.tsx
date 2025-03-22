import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts";
import { Container, ChartsContainer,ChartBox,Button} from "../styles";


// // 📌 组件样式
// const Container = styled.div`
//   padding: 20px;
// `;

// const ChartsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

// const ChartBox = styled.div`
//   flex: 1;
//   min-width: 300px;
//   background: #1e1e1e;
//   padding: 15px;
//   border-radius: 10px;
//   color: white;
// `;

const WarningBox = styled.div`
  background: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
`;

// const Button = styled.button`
//   padding: 10px;
//   border-radius: 5px;
//   background: #008CBA;
//   color: white;
//   cursor: pointer;
//   border: none;
//   margin-bottom: 10px;
// `;


// 📌 初始缺陷数据（3 组输入数据）
const initialDefectData = [
    { type: "裂纹", input1: 5, output1: 8 },
    { type: "夹杂物", input1: 3, output1: 7 },
    { type: "气孔", input1: 4, output1: 6 },
  ];

  type DefectData = {
    type: string;
    [key: `input${number}`]: number;
    [key: `output${number}`]: number;
  };

export default function EnhancedEquipmentInspection() {
  // 📌 设备 & 材料数据
  const [data, setData] = useState([
    { time: "10:00", vibration: 2.1, spectrum: 0.9, pressure: 20, temperature: 1150, defectRate: 1.2, healthScore: 85 },
    { time: "10:05", vibration: 2.5, spectrum: 1.1, pressure: 22, temperature: 1170, defectRate: 1.5, healthScore: 80 },
    { time: "10:10", vibration: 3.0, spectrum: 1.4, pressure: 25, temperature: 1180, defectRate: 2.0, healthScore: 75 },
  ]);

  const [warnings, setWarnings] = useState<string[]>([]);
  const [maintenanceSuggestions, setMaintenanceSuggestions] = useState<string[]>([]);

  const [defectData, setDefectData] = useState<DefectData[]>(initialDefectData);
  //const [defectData, setDefectData] = useState(initialDefectData);
  const [groupCount, setGroupCount] = useState(1); // 记录数据组数

  // 📌 生成更多数据（新增一组输入 & 输出数据）
  const generateMoreDefectData = () => {
    const newGroupIndex = groupCount + 1;
    const newDefects = defectData.map(defect => ({
      ...defect,
      [`input${newGroupIndex}`]: defect[`input${groupCount}`] + Math.floor(Math.random() * 3),
      [`output${newGroupIndex}`]: defect[`output${groupCount}`] + Math.floor(Math.random() * 5),
    }));

    setDefectData(newDefects);
    setGroupCount(newGroupIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        vibration: Math.random() * 1.5 + 2.0,
        spectrum: Math.random() * 0.5 + 1.0,
        pressure: Math.random() * 10 + 20,
        temperature: Math.random() * 50 + 1100,
        defectRate: Math.random() * 2 + 1.0,
        healthScore: Math.random() * 20 + 70, // 设备健康分数
      };

      setData(prevData => [...prevData.slice(-5), newEntry]);

      let newWarnings: string[] = [];
      let newSuggestions: string[] = [];

      if (newEntry.vibration > 3.0) newWarnings.push("⚠️ 设备振动异常，请检查轴承或电机！");
      if (newEntry.spectrum > 1.5) newWarnings.push("⚠️ 材料光谱异常，可能存在合金成分偏差！");
      if (newEntry.defectRate > 1.8) newWarnings.push("⚠️ 缺陷率过高，可能需要调整工艺参数！");
      if (newEntry.healthScore < 75) newSuggestions.push("🔧 建议维护：设备健康状态下降，建议检查润滑情况");

      setWarnings(newWarnings);
      setMaintenanceSuggestions(newSuggestions);
    }, 2000);


    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>🔍 设备与原材料检测系统（增强版）</h1>

      {/* 🚨 警告信息 */}
      {warnings.length > 0 && warnings.map((w, index) => <WarningBox key={index}>{w}</WarningBox>)}

      {/* 🛠 设备维护建议 */}
      {maintenanceSuggestions.length > 0 && maintenanceSuggestions.map((s, index) => <WarningBox key={index} style={{ background: "#ffa500" }}>{s}</WarningBox>)}

      <ChartsContainer>
        {/* 📊 设备振动频谱图 */}
        <ChartBox>
          <h3>📊 设备振动频谱</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1.5, 3.5]} unit="g" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={3.0} stroke="red" label="⚠️ 超标" />
              <Line type="monotone" dataKey="vibration" stroke="blue" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🌈 材料光谱分析 */}
        <ChartBox>
          <h3>🌈 材料光谱分析</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <XAxis dataKey="time" />
              <YAxis domain={[0.5, 2.0]} unit="%" />
              <Tooltip />
              <Legend />
              <Scatter data={data} dataKey="spectrum" fill="green" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🔥 设备温度 & 压力 */}
        <ChartBox>
          <h3>🔥 设备温度 & 压力</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1000, 1250]} unit="℃" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1200} stroke="red" label="⚠️ 超温" />
              <Line type="monotone" dataKey="temperature" stroke="orange" />
              <Line type="monotone" dataKey="pressure" stroke="purple" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 🛠 缺陷率预测 */}
        <ChartBox>
          <h3>🛠 缺陷率预测</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 2.5]} unit="%" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1.8} stroke="red" label="⚠️ 超标" />
              <Bar dataKey="defectRate" fill="red" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 📈 设备健康状态预测 */}
        <ChartBox>
          <h3>📈 设备健康状态</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[60, 100]} unit="%" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={75} stroke="red" label="⚠️ 维护建议" />
              <Line type="monotone" dataKey="healthScore" stroke="green" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>

      <h1>📊 缺陷数据扩展（多组输入 vs. 输出）</h1>
      <Button onClick={generateMoreDefectData}>➕ 生成更多缺陷数据</Button>

      {/* 📊 多组输入数据 & 生成数据（分组柱状图） */}
      <ChartBox>
        <h3>📊 缺陷数据分布（多组输入 & 输出）</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={defectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* 遍历 groupCount，动态添加多组柱状数据 */}
            {[...Array(groupCount)].map((_, index) => {
              const groupId = index + 1;
              return [
                <Bar key={`input${groupId}`} dataKey={`input${groupId}`} fill="#ff7300" name={`输入数据 ${groupId}`} />,
                <Bar key={`output${groupId}`} dataKey={`output${groupId}`} fill="#82ca9d" name={`生成数据 ${groupId}`} />,
              ];
            })}
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
    </Container>
  );
}
