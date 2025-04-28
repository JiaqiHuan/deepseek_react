import styled from "styled-components";

// 设备详情容器
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

// 设备基本信息部分
const InfoSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: 10px 0;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const InfoValue = styled.span`
  color: #555;
`;

// 传感器数据部分
const DataSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
`;

const DataTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

// 设备维护记录部分
const RecordSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RecordItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
`;

const RecordTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export default function EquipmentDetail() {
  // 模拟设备详情数据
  const equipment = {
    id: 1,
    name: "炼钢设备1",
    category: "steel",
    status: "正常",
    model: "SG1000",
    location: "炼钢车间",
    owner: "张三",
    lastMaintenance: "2023-03-01",
    nextMaintenance: "2023-06-01",
    sensorData: [
      { label: "温度", value: "75°C" },
      { label: "压力", value: "1.2MPa" },
      { label: "电流", value: "15A" },
      { label: "振动", value: "0.02mm/s" },
    ],
    maintenanceRecords: [
      { date: "2023-03-01", type: "例行检查", status: "完成" },
      { date: "2023-02-15", type: "故障修复", status: "完成" },
    ],
  };

  return (
    <Container>
      <h1>设备详情 - {equipment.name}</h1>

      {/* 设备基本信息 */}
      <InfoSection>
        <InfoItem>
          <InfoLabel>设备编号:</InfoLabel>
          <InfoValue>{equipment.id}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>型号:</InfoLabel>
          <InfoValue>{equipment.model}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>所属区域:</InfoLabel>
          <InfoValue>{equipment.location}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>设备负责人:</InfoLabel>
          <InfoValue>{equipment.owner}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>状态:</InfoLabel>
          <InfoValue>{equipment.status}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>上次维护时间:</InfoLabel>
          <InfoValue>{equipment.lastMaintenance}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>下次维护时间:</InfoLabel>
          <InfoValue>{equipment.nextMaintenance}</InfoValue>
        </InfoItem>
      </InfoSection>

      {/* 传感器数据 */}
      <DataSection>
        <DataTitle>传感器数据</DataTitle>
        {equipment.sensorData.map((data, index) => (
          <DataItem key={index}>
            <span>{data.label}</span>
            <span>{data.value}</span>
          </DataItem>
        ))}
      </DataSection>

      {/* 设备维护记录 */}
      <RecordSection>
        <RecordTitle>设备维护记录</RecordTitle>
        {equipment.maintenanceRecords.map((record, index) => (
          <RecordItem key={index}>
            <span>{record.date}</span>
            <span>{record.type} - {record.status}</span>
          </RecordItem>
        ))}
      </RecordSection>
    </Container>
  );
}
