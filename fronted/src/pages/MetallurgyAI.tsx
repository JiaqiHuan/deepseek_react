import { useState } from "react";
import styled from "styled-components";

// 📌 组件样式
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
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

const AnswerBox = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
  text-align: left;
  min-height: 50px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

// 📌 冶金大语言系统页面组件
export default function MetallurgyAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      setAnswer(data.response);
    } catch (err) {
      setError("获取 AI 回答失败，请稍后重试！");
      setAnswer("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>🧠 冶金大语言系统</Title>
      <InputArea>
        <Input
          type="text"
          placeholder="请输入您的问题..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAsk} disabled={loading}>
          {loading ? "思考中..." : "提问"}
        </Button>
      </InputArea>

      {answer && <AnswerBox>AI 回答：{answer}</AnswerBox>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
