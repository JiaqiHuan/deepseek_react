import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer} from "recharts";
import { Container, ChartsContainer,ChartBox} from "../styles";




const Canvas = styled.svg`
  width: 100%;
  height: 400px;
  background: #222;
  border-radius: 10px;
`;

const Crane = styled.circle`
  fill: red;
  stroke: white;
  stroke-width: 2;
`;

const PathLine = styled.polyline`
  fill: none;
  stroke: yellow;
  stroke-width: 3;
  stroke-dasharray: 5, 5;
`;

const PositionText = styled.text`
  fill: white;
  font-size: 14px;
  font-weight: bold;
`;

const TaskPanel = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #333;
  border-radius: 10px;
  width: 98%;
`;

const TaskItem = styled.div`
  background: #444;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
`;


const FactoryLayout = styled.rect`
  fill: #555;
  stroke: white;
  stroke-width: 2;
`;

export default function CraneDispatch() {
  const [trajectory, setTrajectory] = useState([{ x: 50, y: 50, z: 5 }]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50, z: 5 });
  const [taskQueue, setTaskQueue] = useState([
    { id: 1, name: "搬运任务 A", status: "进行中" },
    { id: 2, name: "搬运任务 B", status: "等待中" },
    { id: 3, name: "搬运任务 C", status: "等待中" },
  ]);
  const [speedData, setSpeedData] = useState<{ time: number; speed: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrajectory((prev) => {
        const newX = prev[prev.length - 1].x + Math.random() * 30 - 15;
        const newY = prev[prev.length - 1].y + Math.random() * 30 - 15;
        const newZ = Math.max(1, Math.min(10, prev[prev.length - 1].z + Math.random() * 2 - 1));
        const newPoint = { x: Math.max(10, Math.min(390, newX)), y: Math.max(10, Math.min(390, newY)), z: newZ };
        setCurrentPosition(newPoint);
        setSpeedData((prevData) => [...prevData.slice(-10), { time: prevData.length, speed: Math.random() * 10 }]);
        return [...prev.slice(-10), newPoint];
      });
      
      setTaskQueue((prevTasks) =>
        prevTasks.map((task, index) =>
          index === 0 && task.status === "进行中" ? { ...task, status: "已完成" } : task
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1>无人天车调度系统</h1>
      <h2>天车轨迹（俯视图）</h2>
      <Canvas viewBox="0 0 400 400">
        <FactoryLayout x="50" y="50" width="300" height="300" />
        <PathLine points={trajectory.map((p) => `${p.x},${p.y}`).join(" ")} />
        <Crane cx={currentPosition.x} cy={currentPosition.y} r="8" />
        <PositionText x={currentPosition.x + 10} y={currentPosition.y - 10}>
          🚗 {`(${currentPosition.x}, ${currentPosition.y}, 高度: ${currentPosition.z})`}
        </PositionText>
      </Canvas>


      <h2>📊 运行数据仪表盘</h2>
      <ChartsContainer>
        <ChartBox>
          
            <ResponsiveContainer width="100%" height={250}>
            <LineChart width={600} height={300} data={speedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
            </LineChart>
            </ResponsiveContainer>
          </ChartBox>
        </ChartsContainer>

        <h2>📋 任务队列</h2>
        <TaskPanel>
        
        {taskQueue.map((task) => (
          <TaskItem key={task.id}>
            {task.name} - <strong>{task.status}</strong>
          </TaskItem>
        ))}
      </TaskPanel>
    </Container>
  );
}
