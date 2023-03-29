import Guess from './Guess';

export default function Board({ results }) {
    return (
        <div className="board">
            {results.map((result, index) => {
                return (
                    <Guess 
                        key={index} 
                        results={result} 
                    />
                );
            })}
        </div>
    );
}