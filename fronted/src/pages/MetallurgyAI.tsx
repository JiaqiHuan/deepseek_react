// import { useState } from "react";
// import styled from "styled-components";

// // 📌 组件样式
// const Container = styled.div`
//   max-width: 800px;
//   margin: 50px auto;
//   padding: 20px;
//   text-align: center;
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   margin-bottom: 20px;
// `;

// const InputArea = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   flex: 1;
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   font-size: 16px;
//   background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

//   &:hover {
//     background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
//   }
// `;

// const AnswerBox = styled.div`
//   padding: 15px;
//   background: #f8f9fa;
//   border-radius: 5px;
//   text-align: left;
//   min-height: 50px;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin-top: 10px;
// `;

// // 📌 冶金大语言系统页面组件
// export default function MetallurgyAI() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleAsk = async () => {
//     if (!question.trim()) return;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: question }),
//       });

//       if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

//       const data = await response.json();
//       setAnswer(data.response);
//     } catch (err) {
//       setError("获取 AI 回答失败，请稍后重试！");
//       setAnswer("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Title>🧠 冶金大语言系统</Title>
//       <InputArea>
//         <Input
//           type="text"
//           placeholder="请输入您的问题..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <Button onClick={handleAsk} disabled={loading}>
//           {loading ? "思考中..." : "提问"}
//         </Button>
//       </InputArea>

//       {answer && <AnswerBox>AI 回答：{answer}</AnswerBox>}
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//     </Container>
//   );
// }



// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Define TypeScript interfaces
// interface Reading {
//   time: string;
//   value: number;
// }

// interface Statistics {
//   average: number;
//   max: number;
//   min: number;
//   trend: string;
//   alert: boolean;
// }

// interface GasData {
//   name: string;
//   unit: string;
//   readings: Reading[];
//   statistics: Statistics;
// }

// interface FlueGasAnalysisData {
//   system: string;
//   timestamp: string;
//   data: GasData[];
// }

// const FlueGasAnalysisPage: React.FC = () => {
//   // Sample data - in a real app, this would come from an API
//   const gasData: FlueGasAnalysisData = {
//     "system": "钢炉温度监测",
//     "timestamp": "2023-04-04T15:00:00Z",
//     "data": [
//       {
//         "name": "1号钢炉温度",
//         "unit": "℃",
//         "readings": [
//           {"time": "2023-03-30", "value": 1545},
//           {"time": "2023-03-31", "value": 1552},
//           {"time": "2023-04-01", "value": 1560},
//           {"time": "2023-04-02", "value": 1558},
//           {"time": "2023-04-03", "value": 1563}
//         ],
//         "statistics": {
//           "average": 1555.6,
//           "max": 1563,
//           "min": 1545,
//           "trend": "rising",
//           "alert": false
//         }
//       },
//       {
//         "name": "2号钢炉温度",
//         "unit": "℃",
//         "readings": [
//           {"time": "2023-03-30", "value": 1538},
//           {"time": "2023-03-31", "value": 1545},
//           {"time": "2023-04-01", "value": 1552},
//           {"time": "2023-04-02", "value": 1550},
//           {"time": "2023-04-03", "value": 1557}
//         ],
//         "statistics": {
//           "average": 1548.4,
//           "max": 1557,
//           "min": 1538,
//           "trend": "rising",
//           "alert": false
//         }
//       },
//       {
//         "name": "3号钢炉温度",
//         "unit": "℃",
//         "readings": [
//           {"time": "2023-03-30", "value": 1560},
//           {"time": "2023-03-31", "value": 1555},
//           {"time": "2023-04-01", "value": 1568},
//           {"time": "2023-04-02", "value": 1572},
//           {"time": "2023-04-03", "value": 1565}
//         ],
//         "statistics": {
//           "average": 1564.0,
//           "max": 1572,
//           "min": 1555,
//           "trend": "fluctuating",
//           "alert": false
//         }
//       }
//     ]
//   };

//   // Function to format chart data
//   const formatChartData = (readings: Reading[]) => {
//     return readings.map(reading => ({
//       time: reading.time,
//       value: reading.value
//     }));
//   };

//   return (
//     <div className="page-container">
//       <header className="page-header">
//         <h1>{gasData.system}</h1>
//         <p className="timestamp">
//           数据更新时间: {new Date(gasData.timestamp).toLocaleString()}
//         </p>
//       </header>

//       <div className="charts-container">
//         {gasData.data.map((gas, index) => (
//           <div key={index} className="chart-card">
//             <h2>{gas.name} ({gas.unit})</h2>
            
//             <div className="chart-wrapper">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={formatChartData(gas.readings)}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="time" />
//                   <YAxis label={{ value: gas.unit, angle: -90, position: 'insideLeft' }} />
//                   <Tooltip 
//                     formatter={(value: number) => [`${value} ${gas.unit}`, gas.name]}
//                     labelFormatter={(time) => `时间: ${time}`}
//                   />
//                   <Legend />
//                   <Line 
//                     type="monotone" 
//                     dataKey="value" 
//                     name={gas.name}
//                     stroke={index === 0 ? "#ff6b6b" : "#8884d8"} 
//                     strokeWidth={2}
//                     activeDot={{ r: 6 }} 
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="stats-panel">
//               <div className="stat-item">
//                 <span className="stat-label">平均值</span>
//                 <span className="stat-value">
//                   {gas.statistics.average} {gas.unit}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">最大值</span>
//                 <span className="stat-value">
//                   {gas.statistics.max} {gas.unit}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">最小值</span>
//                 <span className="stat-value">
//                   {gas.statistics.min} {gas.unit}
//                 </span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-label">趋势</span>
//                 <span className="stat-value">
//                   {gas.statistics.trend === 'stable' ? '稳定' : '波动'}
//                 </span>
//               </div>
//             </div>

//             <div className={`alert-status ${gas.statistics.alert ? 'alert' : 'normal'}`}>
//               {gas.statistics.alert ? '警报: 浓度超标' : '浓度正常'}
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         .page-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Arial', sans-serif;
//           color: #333;
//         }

//         .page-header {
//           margin-bottom: 30px;
//           padding-bottom: 15px;
//           border-bottom: 1px solid #eee;
//         }

//         .page-header h1 {
//           margin: 0;
//           font-size: 24px;
//         }

//         .timestamp {
//           margin: 0;
//           color: #666;
//           font-size: 14px;
//         }

//         .charts-container {
//           display: grid;
//           gap: 30px;
//         }

//         .chart-card {
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//           padding: 20px;
//         }

//         .chart-card h2 {
//           margin-top: 0;
//           margin-bottom: 20px;
//           font-size: 18px;
//           color: #333;
//         }

//         .chart-wrapper {
//           margin-bottom: 20px;
//         }

//         .stats-panel {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 15px;
//           margin: 20px 0;
//           background: #f8f9fa;
//           padding: 15px;
//           border-radius: 8px;
//         }

//         .stat-item {
//           text-align: center;
//         }

//         .stat-label {
//           display: block;
//           font-size: 12px;
//           color: #666;
//           margin-bottom: 5px;
//         }

//         .stat-value {
//           font-size: 16px;
//           font-weight: bold;
//           color: #333;
//         }

//         .alert-status {
//           text-align: center;
//           padding: 8px;
//           border-radius: 4px;
//           font-weight: bold;
//           margin-top: 15px;
//         }

//         .alert-status.normal {
//           background-color: #d4edda;
//           color: #155724;
//         }

//         .alert-status.alert {
//           background-color: #f8d7da;
//           color: #721c24;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FlueGasAnalysisPage;


import { useState } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 📌 组件样式
const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
`;

const StatItem = styled.div`
  text-align: center;
`;

// const StatusIndicator = styled.div`
//   display: inline-block;
//   padding: 5px 10px;
//   border-radius: 20px;
//   // background: ${props => props.alert ? '#dc3545' : '#28a745'};
//   color: white;
//   font-size: 14px;
//   margin-top: 10px;
// `;

// 📌 类型定义
interface Reading {
  time: string;
  value: number;
}

interface Statistics {
  average: number;
  max: number;
  min: number;
  trend: string;
  alert: boolean;
}

interface GasData {
  name: string;
  unit: string;
  readings: Reading[];
  statistics: Statistics;
}

interface FlueGasResponse {
  system: string;
  timestamp: string;
  data: GasData[];
}

export default function MetallurgyAI() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gasData, setGasData] = useState<FlueGasResponse | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setGasData(null);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      
      // 假设后端返回的是我们需要的格式
      // if (data.system && data.data) {
      //   setGasData(data);
      // } else {
      //   throw new Error("返回数据格式不符合预期");
      // }
    } catch (err) {
      setError("获取数据失败，请稍后重试！");
    } finally {
      setLoading(false);
    }
  };

  // 格式化图表数据
  const formatChartData = (readings: Reading[]) => {
    return readings.map(reading => ({
      time: reading.time,
      value: reading.value
    }));
  };

  return (
    <Container>
      <Title>🧠 冶金数据分析系统</Title>
      <InputArea>
        <Input
          type="text"
          placeholder="请输入您的问题或数据请求..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAsk} disabled={loading}>
          {loading ? "请求中..." : "获取数据"}
        </Button>
      </InputArea>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {gasData && (
        <div className="analysis-results">
          <h3>{gasData.system} - {new Date(gasData.timestamp).toLocaleString()}</h3>
          
          {gasData.data.map((gas, index) => (
            <ChartContainer key={index}>
              <ChartTitle>{gas.name} ({gas.unit})</ChartTitle>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formatChartData(gas.readings)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: gas.unit, angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} ${gas.unit}`, gas.name]}
                    labelFormatter={(time) => `时间: ${time}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name={gas.name}
                    stroke={index === 0 ? "#ff6b6b" : "#8884d8"} 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>

              <StatsContainer>
                <StatItem>
                  <div>平均值</div>
                  <div><strong>{gas.statistics.average} {gas.unit}</strong></div>
                </StatItem>
                <StatItem>
                  <div>最大值</div>
                  <div><strong>{gas.statistics.max} {gas.unit}</strong></div>
                </StatItem>
                <StatItem>
                  <div>最小值</div>
                  <div><strong>{gas.statistics.min} {gas.unit}</strong></div>
                </StatItem>
                <StatItem>
                  <div>趋势</div>
                  <div><strong>{gas.statistics.trend === 'stable' ? '稳定' : '波动'}</strong></div>
                </StatItem>
              </StatsContainer>

              {/* <StatusIndicator alert={gas.statistics.alert}>
                {gas.statistics.alert ? '警报: 浓度超标' : '状态正常'}
              </StatusIndicator> */}
            </ChartContainer>
          ))}
        </div>
      )}
    </Container>
  );
}