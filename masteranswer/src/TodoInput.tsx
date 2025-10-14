// TodoInput.tsx
import { useRef } from "react";

type Props = {
  onAdd: (text: string) => void;
};

function TodoInput({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const value = inputRef.current?.value.trim();
    if (!value) return;
    onAdd(value);
    inputRef.current!.value = "";
  };

  return (
    <>
      <input ref={inputRef} placeholder="할 일을 입력하세요" />
      <button onClick={add}>추가</button>
    </>
  );
}

export default TodoInput;
