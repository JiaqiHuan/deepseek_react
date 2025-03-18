import styled from "styled-components";

const CardContainer = styled.div<{ status: string }>`
  background: ${({ status }) =>
    status === "green" ? "#28a745" : status === "yellow" ? "#ffc107" : "#dc3545"};
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export default function Card({ title, status }: { title: string; status: string }) {
  return (
    <CardContainer status={status}>
      <h3>{title}</h3>
    </CardContainer>
  );
}
