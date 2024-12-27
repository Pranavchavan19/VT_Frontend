export function timeAgo(createdAt){
const now = new Date();
const difference = Math.abs(now - new Date(createdAt));

const seconds = difference / 1000;
const miniutes = seconds / 60 ;
const hours = miniutes / 60;
const days = hours / 24 ;
const weeks = days / 7;
const years = weeks / 52;

if(seconds < 60){
    return `${Math.round(seconds)} seconds ago`;
}else if (miniutes < 60) {
    return `${Math.round(miniutes)} miniutes ago`
}else if (hours < 24) {
    return `${Math.round(hours)} hours ago`
}else if (days < 7) {
    return `${Math.round(days)} days ago`
}else if (weeks < 52) {
    return `${Math.round(weeks)} weeks ago`
}else{
    return `${Math.round(years)} years ago`
}

}
export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}