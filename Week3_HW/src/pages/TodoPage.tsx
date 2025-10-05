import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import type { Todo } from "../types/todo";
import TodoItem from "../components/TodoItem";

const STORAGE_KEY = "todos";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as Todo[];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState<string>("");

  // 데이터 유지
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const canAdd = useMemo(() => input.trim().length > 0, [input]);

  // 할일 추가
  const addTodo = () => {
    if (!canAdd) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  // 토글 버튼 (완료 표시)
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // 할일 삭제
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 추가 -> 할일 등록
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <Container>
      <Card>
        <Title>할 일 목록</Title>

        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요"
            aria-label="할 일 입력"
          />
          <AddButton type="submit" disabled={!canAdd} aria-disabled={!canAdd}>
            추가
          </AddButton>
        </Form>

        <TodoList>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </TodoList>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  gap: 20px;
  padding: 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: #86cfffff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  padding: 20px 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 4px 8px 16px;
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin: 0 8px 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const AddButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #1230a7ff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.02s ease;

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0 8px;
  margin: 8px 0 0;
`;
