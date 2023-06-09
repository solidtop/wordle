export default function GuessRow({ results }) {
  return (
    <div className="board-row">
      {results.map((res, index) => {
        const { letter, result } = res;
        return (
          <div key={index} className={`${result} tile`}>
            {letter.toLocaleUpperCase()}
          </div>
        );
      })}
    </div>
  );
}
