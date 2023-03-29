export default function Guess({ results }) {
    return (
        <div className="board-row">
            {results.map((res, index) => {
                const { letter, result } = res;
                return(
                    <div key={index} className={`${result} tile`}>
                        {letter}
                    </div>
                );
            })}
        </div>
    );
}