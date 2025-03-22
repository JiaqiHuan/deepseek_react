import styled from "styled-components";

// 📌 组件样式
export const Container = styled.div`
  padding: 20px;
  max-width: 1600px;
  margin: auto;
  text-align: center;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const ChartBox = styled.div`
  flex: 1;
  min-width: 300px;
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  color: white;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: black;  // 📌 这里改成黑色字体
  background: white; // 确保黑色字体对比清晰
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

// 📌 生产建议部分（保证宽度与图表一致）
export const SuggestionContainer = styled.div`
  max-width: 1200px;  // ✅ 保证宽度和图表整体一致
  width: 100%;
  margin: 20px auto;  // ✅ 居中
  text-align: left;
`;

// 📌 生产建议框
export const SuggestionBox = styled.div`
  background: #333;
  padding: 10px;
  border-radius: 5px;
  color: #ddd;
  margin-top: 10px;
`;

export const Alert = styled.div<{ level: string }>`
  padding: 10px;
  border-radius: 5px;
  background: ${({ level }) =>
    level === "normal" ? "#28a745" :
    level === "warning" ? "#ffc107" :
    "#dc3545"};
  color: white;
  margin-bottom: 15px;
`;