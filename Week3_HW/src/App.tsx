import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import TodoPage from "./pages/TodoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 페이지 */}
        <Route
          path="/"
          element={
            <HomeContainer>
              <h1>할 일 관리 프로그램</h1>
              <Button to="/todo-list">할 일 목록으로 이동</Button>
            </HomeContainer>
          }
        />

        {/* 할일 목록 페이지 */}
        <Route path="/todo-list" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  gap: 20px;
`;

const Button = styled(Link)`
  padding: 12px 20px;
  background: #2563eb;
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
`;
