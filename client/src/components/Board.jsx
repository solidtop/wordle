import GuessRow from './GuessRow';

export default function Board({ results }) {
    return (
        <div className="board">
            {results.map((result, index) => {
                return <GuessRow key={index} results={result} />;
            })}
        </div>
    );
}
