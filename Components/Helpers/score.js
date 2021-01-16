let score = 0;
function addScore () { score ++}
const bestScore = window.localStorage.getItem('bestScore') || 0;

export {
    score,
    bestScore,
    addScore,
}