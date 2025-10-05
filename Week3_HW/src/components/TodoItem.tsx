import styled from "styled-components";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <ListItem>
      <Label>
        <Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <Text $completed={todo.completed}>{todo.text}</Text>
      </Label>
      <DeleteButton type="button" onClick={() => onDelete(todo.id)}>
        삭제
      </DeleteButton>
    </ListItem>
  );
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 1);
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Text = styled.span<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  color: ${({ $completed }) => ($completed ? "#999" : "inherit")};
`;

const DeleteButton = styled.button`
  background: #e11d48;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background: #be123c;
  }
`;
