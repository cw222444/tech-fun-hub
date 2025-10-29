// Load JSON data from the data folder
async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

// Get index based on current day of the year
function getDayIndex(length) {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % length;
}

// Initialize the website content
async function init() {
    // Load all JSON files
    const jokes = await loadJSON('data/jokes.json');
    const facts = await loadJSON('data/facts.json');
    const puzzles = await loadJSON('data/puzzles.json');
    const quotes = await loadJSON('data/quotes.json');
    const quiz = await loadJSON('data/quiz.json');

    // Display Joke of the Day
    const jokeIndex = getDayIndex(jokes.length);
    document.getElementById('joke-text').innerText = jokes[jokeIndex].text;
    document.getElementById('joke-punchline').innerText = jokes[jokeIndex].punchline;

    // Display Fact of the Day
    const factIndex = getDayIndex(facts.length);
    document.getElementById('fact-text').innerText = facts[factIndex].text;

    // Display Puzzle of the Day
    const puzzleIndex = getDayIndex(puzzles.length);
    document.getElementById('puzzle-text').innerText = puzzles[puzzleIndex].text;

    // Display Quote of the Day
    const quoteIndex = getDayIndex(quotes.length);
    document.getElementById('quote-text').innerText = quotes[quoteIndex].text;

    // Display Quiz of the Day
    const quizIndex = getDayIndex(quiz.length);
    const quizItem = quiz[quizIndex];
    document.getElementById('quiz-question').innerText = quizItem.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = ''; // Clear previous buttons

    quizItem.options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;

        btn.onclick = () => {
            const result = document.getElementById('quiz-result');
            if(option === quizItem.answer){
                result.innerText = "Correct! 🎉";
                result.style.color = "lightgreen";
            } else {
                result.innerText = `Wrong! Correct answer: ${quizItem.answer}`;
                result.style.color = "red";
            }
        };
        optionsContainer.appendChild(btn);
    });
}

// Run the init function when page loads
init();
