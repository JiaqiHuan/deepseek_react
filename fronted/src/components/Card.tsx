import styled from "styled-components";
import { theme } from "../theme";

const CardContainer = styled.div`
  background-color: ${theme.colors.card};
  padding: 20px;
  border-radius: 12px;
  box-shadow: ${theme.shadow};
  text-align: center;
  color: white;
  font-size: 18px;
`;

export default function Card({ title }: { title: string }) {
  return <CardContainer>{title}</CardContainer>;
}
