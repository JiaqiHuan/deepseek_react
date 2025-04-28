import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEquipmentListByCategory, Equipment } from "../../services/equipmentService";
import styled from "styled-components";

// 页面容器
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

// 标题
const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
`;

// 表格容器
const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 30px;
`;

// 表格样式
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: left;
`;

// 表头样式
const TableHeader = styled.th`
  padding: 15px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

// 表格内容样式
const TableCell = styled.td`
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 16px;
`;

// 设备状态的颜色标识
const StatusBadge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

// 操作按钮样式
const Button = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// 返回设备总览按钮
const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export default function EquipmentList() {
  const { category } = useParams<{ category: string }>();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      getEquipmentListByCategory(category).then((data) => {
        setEquipmentList(data);
        setLoading(false);
      });
    }
  }, [category]);

  if (loading) return <p>加载中...</p>;

  return (
    <Container>
      <Title>📌 {category} 设备列表</Title>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>设备编号</TableHeader>
              <TableHeader>设备名称</TableHeader>
              <TableHeader>状态</TableHeader>
              <TableHeader>维护到期</TableHeader>
              <TableHeader>操作</TableHeader>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map((equipment) => (
              <tr key={equipment.id}>
                <TableCell>{equipment.id}</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>
                  <StatusBadge color={getStatusColor(equipment.status)}>{equipment.status}</StatusBadge>
                </TableCell>
                <TableCell>{equipment.maintenanceDue}</TableCell>
                <TableCell>
                  <Link to={`/equipment/${category}/${equipment.id}`}>
                    <Button>查看详情</Button>
                  </Link>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <BackButton to="/equipment/Dashboard">返回设备总览</BackButton>
    </Container>
  );
}

// 根据设备状态返回对应的颜色
function getStatusColor(status: string) {
  switch (status) {
    case "正常":
      return "green";
    case "需维护":
      return "orange";
    case "故障":
      return "red";
    case "停机":
      return "gray";
    default:
      return "black";
  }
}
