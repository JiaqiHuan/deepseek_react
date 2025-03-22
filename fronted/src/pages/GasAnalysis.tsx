import { useState, useEffect } from "react";
//import styled from "styled-components";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer 
} from "recharts";
import { Container, ChartsContainer,ChartBox,Alert,SuggestionBox} from "../styles";


export default function GasAnalysis() {
  const [data, setData] = useState([
    { time: "10:00", temperature: 1450, oxygen: 15, CO2: 350, SO2: 10, NOx: 25, scrap: 60, pigIron: 30, alloy: 10 },
    { time: "10:05", temperature: 1460, oxygen: 16, CO2: 360, SO2: 12, NOx: 27, scrap: 58, pigIron: 32, alloy: 10 },
    { time: "10:10", temperature: 1470, oxygen: 17, CO2: 370, SO2: 11, NOx: 29, scrap: 55, pigIron: 35, alloy: 10 },
  ]);
  const [alertLevel, setAlertLevel] = useState("normal");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 5),
        temperature: Math.random() * 100 + 1400, // 1400 ~ 1500℃
        oxygen: Math.random() * 10 + 12, // 12% ~ 22%
        CO2: Math.random() * 100 + 300, // 300 ~ 400 ppm
        SO2: Math.random() * 5 + 8, // 8 ~ 13 ppm
        NOx: Math.random() * 10 + 20, // 20 ~ 30 ppm
        scrap: Math.random() * 10 + 55, // 55 ~ 65%
        pigIron: Math.random() * 10 + 30, // 30 ~ 40%
        alloy: Math.random() * 5 + 8, // 8 ~ 12%
      };

      setData(prevData => [...prevData.slice(-5), newEntry]);

      const { temperature, CO2, SO2, NOx, scrap, pigIron, alloy } = newEntry;
      let newSuggestions: string[] = [];

      if (temperature > 1480) {
        setAlertLevel("danger");
        newSuggestions.push("🔥 温度过高！建议降低加热功率或减少燃料输入量。");
      } else if (temperature < 1420) {
        setAlertLevel("warning");
        newSuggestions.push("❄️ 温度偏低！建议增加加热功率或提高燃料输入。");
      }

      if (CO2 > 380) {
        setAlertLevel("danger");
        newSuggestions.push("🌫️ CO₂ 超标！优化燃料输入或调整氧气供给。");
      }
      if (SO2 > 12) {
        setAlertLevel("warning");
        newSuggestions.push("⚠️ SO₂ 过高！建议检查脱硫装置或优化燃料。");
      }
      if (NOx > 28) {
        setAlertLevel("warning");
        newSuggestions.push("⚠️ NOx 过高！优化燃烧温度，降低排放。");
      }

      if (scrap < 57) {
        newSuggestions.push("🔧 废钢比例偏低，可能影响钢水成分。建议增加废钢用量。");
      }
      if (pigIron > 38) {
        newSuggestions.push("🛠️ 生铁比例过高，可能影响成品硬度。建议适当减少生铁。");
      }
      if (alloy < 9) {
        newSuggestions.push("⚙️ 合金比例偏低，可能影响钢材质量。适当增加合金添加量。");
      }

      setSuggestions(newSuggestions);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>🔥 烟气分析 & 炉温监测</h1>

      <ChartsContainer>
        {/* 炉温趋势 */}
        <ChartBox>
          <h3>🔥 炉温趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[1400, 1500]} unit="℃" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={1460} stroke="#ffc107" label="⚠️ 警戒线" />
              <ReferenceLine y={1480} stroke="red" label="🚨 超标" />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 烟气成分 */}
        <ChartBox>
          <h3>💨 烟气成分 (CO₂, SO₂, NOx)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CO2" stroke="red" name="CO₂" />
              <Line type="monotone" dataKey="SO2" stroke="orange" name="SO₂" />
              <Line type="monotone" dataKey="NOx" stroke="yellow" name="NOx" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        {/* 原料配比 */}
        <ChartBox>
          <h3>⚖️ 材料配比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="scrap" stroke="green" name="废钢 %" />
              <Line type="monotone" dataKey="pigIron" stroke="blue" name="生铁 %" />
              <Line type="monotone" dataKey="alloy" stroke="purple" name="合金 %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsContainer>

      {/* 异常报警 */}
      <h2>⚠️ 异常报警</h2>
      <Alert level={alertLevel}>
        {alertLevel === "normal" ? "✅ 运行正常" : 
         alertLevel === "warning" ? "⚠️ 设备参数接近上限" : 
         "🚨 超标警告！请立即调整！"}
      </Alert>

      {/* 工艺调整建议 */}
      

      <h2>🛠️ 工艺调整建议</h2>
      {suggestions.map((s, index) => <SuggestionBox key={index}>{s}</SuggestionBox>)}
    </Container>
  );
}
