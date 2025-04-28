export type SensorData = {
    equipmentId: string;
    timestamp: string;
    temperature: number;
    pressure: number;
    current: number;
  };
  
  // 🔹 模拟传感器数据
  const sensorData: SensorData[] = [
    { equipmentId: "E001", timestamp: "2025-03-30 10:00", temperature: 950, pressure: 15.2, current: 320 },
    { equipmentId: "E002", timestamp: "2025-03-30 10:00", temperature: 850, pressure: 18.5, current: 290 },
    { equipmentId: "E003", timestamp: "2025-03-30 10:00", temperature: 60, pressure: 0, current: 0 },
    { equipmentId: "E004", timestamp: "2025-03-30 10:00", temperature: 30, pressure: 1.2, current: 5 },
  ];
  
  // 🔹 获取某个设备的传感器数据
  export const getSensorData = async (equipmentId: string): Promise<SensorData | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(sensorData.find((s) => s.equipmentId === equipmentId)), 500));
  };
  