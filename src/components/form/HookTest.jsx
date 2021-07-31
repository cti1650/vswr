import { useLocalStorage } from 'src/hooks/useLocalStorage';

export const HookTest = (props) => {
  const [storage, setStorage] = useLocalStorage('storage', 0);
  const handleClick = () => {
    setStorage((prev) => prev + 1);
  };
  return (
    <>
      <div>
        <span style='padding:0.4rem'>{storage}</span>
        <button onClick={handleClick}>click</button>
      </div>
    </>
  );
};
