export interface Equipment {
    id: string;
    name: string;
    status: string;
    maintenanceDue: string;
    category: string;
  }
  
  // ✅ 模拟50个设备
  export function getEquipmentListByCategory(category: string): Promise<Equipment[]> {
    const equipmentData: Equipment[] = [];
  
    // 模拟设备数据
    const categories = ["炼钢设备", "热轧设备", "无人天车", "火灾预防设备"];
    
    categories.forEach((cat, index) => {
      let count = 0;
      if (cat === "炼钢设备") count = 10;
      if (cat === "热轧设备") count = 15;
      if (cat === "无人天车") count = 10;
      if (cat === "火灾预防设备") count = 15;
      index = index + 1; // 从1开始
      for (let i = 1; i <= count; i++) {
        const id = `${cat.substring(0, 2)}${i < 10 ? "0" + i : i}`; // E.g., 炉A01
        const name = `${cat} 设备 ${i}`;
        const status = ["正常", "需维护", "故障", "停机"][Math.floor(Math.random() * 4)];
        const maintenanceDue = `2025-${Math.floor(Math.random() * 12) + 1}-15`;
  
        equipmentData.push({ id, name, status, maintenanceDue, category: cat });
      }
    });
  
    return Promise.resolve(equipmentData.filter(e => e.category === category));
  }
  
  // ✅ 获取设备详情
  export function getEquipmentById(id: string): Promise<Equipment> {
    return Promise.resolve({ id, name: `设备 ${id}`, status: "正常", maintenanceDue: "2025-06-15", category: "炼钢设备" });
  }
  