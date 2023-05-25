export default function formatTime(time) {
	const hours = (time.getUTCHours()).toString().padStart(2, "0");
	const minutes = time.getMinutes().toString().padStart(2, "0");
	const seconds = time.getSeconds().toString().padStart(2, "0");
	return time.getUTCHours() > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;  
}