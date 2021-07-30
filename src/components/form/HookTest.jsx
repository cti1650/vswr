import { useLocalStorage } from '../src/hooks/useLocalStorage';
export const HookTest = (props) => {
  const [storage, setStorage] = useLocalStorage('keep', 0);
  const handleClick = () => {
    setStorage((prev) => prev + 1);
  };
  return (
    <>
      <div>{storage}</div>
    </>
  );
};
