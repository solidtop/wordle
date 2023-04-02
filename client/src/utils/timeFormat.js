export default function formatTime(time) {
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;  
}