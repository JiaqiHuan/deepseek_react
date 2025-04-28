export type MaintenanceRecord = {
    equipmentId: string;
    date: string;
    type: "例行检查" | "故障修复";
    technician: string;
    notes: string;
  };
  
  // 🔹 模拟维护记录
  const maintenanceRecords: MaintenanceRecord[] = [
    { equipmentId: "E001", date: "2025-03-01", type: "例行检查", technician: "张三", notes: "设备状态正常" },
    { equipmentId: "E002", date: "2025-02-10", type: "故障修复", technician: "李四", notes: "更换润滑系统" },
    { equipmentId: "E003", date: "2025-03-15", type: "故障修复", technician: "王五", notes: "传感器信号修复失败" },
    { equipmentId: "E004", date: "2025-01-20", type: "例行检查", technician: "赵六", notes: "系统运行正常" },
  ];
  
  // 🔹 获取某个设备的维护记录
  export const getMaintenanceRecords = async (equipmentId: string): Promise<MaintenanceRecord[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(maintenanceRecords.filter((r) => r.equipmentId === equipmentId)), 500)
    );
  };
  