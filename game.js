const words = [
    "abacus", "abandon", "ability", "absence", "academy", "accident", "account", "accuracy", "acquire", "action",
    "addition", "adjust", "advance", "adviser", "aerial", "affection", "aircraft", "algebra", "alliance", "amazing",
    "ambition", "analyze", "ancient", "angelic", "animated", "announce", "anxiety", "apology", "apparent", "appealing",
    "appetite", "approach", "aquatic", "architect", "argument", "artistic", "assembly", "athlete", "atmosphere", "attempt",
    "attract", "audience", "authentic", "automate", "backbone", "backpack", "balance", "balloon", "banquet", "bargain",
    "barrier", "battery", "beautiful", "behavior", "beneath", "benefit", "betray", "bicycle", "bizarre", "blossom",
    "boundary", "bravery", "breakfast", "brilliant", "brochure", "browser", "building", "business", "cabinet", "calculate",
    "campaign", "capacity", "capture", "carefree", "carpenter", "category", "celebrate", "ceremony", "challenge", "champion",
    "character", "chemical", "children", "chocolate", "circular", "civilize", "clarify", "classical", "clothing", "collapse",
    "colleague", "collect", "colorful", "combination", "commerce", "companion", "compete", "complaint", "complete", "complicated",
    "component", "compose", "computer", "concept", "conclude", "condition", "confidence", "conflict", "conquer", "consider",
    "consistent", "construct", "consumer", "contagious", "container", "continue", "contract", "contrary", "contribute", "control",
    "convenience", "conversation", "convince", "cooperate", "corporate", "counsel", "courage", "coverage", "creativity", "criminal",
    "critical", "crossing", "culinary", "curious", "currency", "customer", "cylinder", "database", "decision", "decorate",
    "dedicate", "defender", "delicate", "delivery", "democracy", "dependent", "describe", "designer", "determine", "diameter",
    "dinosaur", "discovery", "discussion", "disguise", "dispatch", "distance", "distinct", "distribute", "dividend", "doctrine",
    "document", "dominant", "dramatic", "dynamics", "economy", "education", "efficient", "elevator", "element", "eliminate",
    "embassy", "emphasis", "employee", "enclosure", "encourage", "endeavor", "energetic", "engineer", "enormous", "entertain",
    "enthusiasm", "entirely", "envelope", "equality", "equation", "equipment", "essential", "estimate", "evaluate", "eventful",
    "evidence", "exercise", "expansion", "experience", "explain", "exploration", "exquisite", "extensive", "extraordinary", "fabricate",
    "facility", "familiar", "fantastic", "fascinate", "favorite", "feedback", "festival", "fiction", "fidelity", "figurative",
    "firework", "flexible", "floating", "forecast", "fortunate", "foundation", "fountain", "fragment", "frequent", "friendship",
    "frontier", "function", "furniture", "galactic", "gallantly", "generate", "generous", "genetics", "geometry", "gesture",
    "glorious", "governor", "graduate", "grateful", "guardian", "guidance", "habitat", "happiness", "harmonic", "headline",
    "heritage", "historical", "holiday", "honestly", "hospital", "humanity", "humorous", "hydrogen", "identity", "ignition",
    "illusion", "imagine", "imitate", "immortal", "important", "impress", "include", "indicate", "industry", "influence",
    "ingredient", "initial", "innovation", "inquiry", "inspired", "instinct", "instrument", "integrate", "intense", "interaction",
    "interest", "interview", "introduce", "invention", "invisible", "involved", "isolation", "jewelry", "journey", "judgment",
    "justice", "kilogram", "landscape", "language", "laughter", "lawrence", "leadership", "learning", "leverage", "lifetime",
    "limestone", "literacy", "location", "magnetic", "magnify", "majestic", "maturity", "mechanic", "medicine", "meditate",
    "memorable", "merchant", "metaphor", "military", "miraculous", "momentum", "monument", "mortgage", "mountain", "movement",
    "mystical", "narrative", "national", "negative", "negotiate", "neutron", "nightmare", "nominate", "notebook", "notorious",
    "numerous", "nutrition", "obedient", "obstacle", "occasion", "occupy", "offensive", "operation", "opponent", "opportunity",
    "optional", "organize", "original", "outbreak", "outcome", "overcome", "overflow", "painter", "palmtree", "paradise",
    "parallel", "patience", "peaceful", "peninsula", "perceive", "perform", "perimeter", "permanent", "persuade", "phenomenon",
    "philosophy", "platform", "pleasant", "political", "popularity", "positive", "potential", "precaution", "precision", "predict",
    "preference", "prejudice", "preliminary", "preparation", "preserve", "president", "prestige", "pretend", "prevention", "principal",
    "principle", "priority", "procedure", "productive", "proficient", "progress", "projection", "promotion", "prosperity", "protective",
    "psychology", "puncture", "pursuade", "quotation", "radiation", "rainforest", "rational", "realistic", "reassure", "recall",
    "receiver", "recognition", "recommend", "reconcile", "recovery", "reduction", "reflection", "reform", "regenerate", "regulation",
    "rehearsal", "rejection", "reliable", "reminder", "renovation", "reputation", "reservoir", "residential", "resolution", "restoration",
    "revolution", "rewarding", "scientific", "sentiment", "significant", "situation", "spectacular", "strategic", "substantial", "sufficient",
    "suspicious", "technical", "tendency", "territory", "thermometer", "traditional", "transparent", "tremendous", "tropical", "trustworthy",
    "universal", "unusual", "valuable", "variable", "victorious", "vigilance", "visibility", "vocabulary", "voluntary", "warranty",
    "workplace", "worthwhile", "wrestling", "xylophone", "yesterday", "youthful", "zealous", "zoological"
];

let currentWord = "";
let scrambledWord = "";
let score = 0;
let wordIndex = 0;
let correctWords = JSON.parse(localStorage.getItem("correctWords")) || []; // Retrieve from localStorage

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleWord(word) {
    const arr = word.split('');
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function startGame() {
    if (wordIndex >= words.length) {
        document.getElementById("scrambledWord").textContent = "Game Over! Your score: " + score;
        document.getElementById("userInput").style.display = "none";
        document.getElementById("checkButton").style.display = "none";
        document.getElementById("refreshButton").style.display = "none";
        document.getElementById("showCorrectWords").style.display = "none";
        return;
    }
    currentWord = words[wordIndex];
    scrambledWord = shuffleWord(currentWord);
    document.getElementById("scrambledWord").textContent = scrambledWord;
    document.getElementById("userInput").value = "";
    document.getElementById("score").textContent = "Score: " + score;
}

function checkAnswer() {
    const userAnswer = document.getElementById("userInput").value.toLowerCase();
    if (userAnswer === currentWord) {
        document.getElementById("result").textContent = "Correct!";
        score++;
        correctWords.push(currentWord);
        localStorage.setItem("correctWords", JSON.stringify(correctWords)); // Save to localStorage
        wordIndex++;
        startGame();
    } else {
        document.getElementById("result").textContent = "Incorrect. Try again!";
    }
}

function refreshWord() {
    scrambledWord = shuffleWord(currentWord);
    document.getElementById("scrambledWord").textContent = scrambledWord;
}

document.getElementById("checkButton").addEventListener("click", checkAnswer);
document.getElementById("refreshButton").addEventListener("click", refreshWord);

document.getElementById("showCorrectWords").addEventListener("click", function() {
    const displayDiv = document.getElementById("correctWordsDisplay");
    if (correctWords.length > 0) {
        displayDiv.textContent = "Correctly answered words: " + correctWords.join(", ");
        displayDiv.style.display = "block";
    } else {
        displayDiv.textContent = "No correctly answered words yet.";
        displayDiv.style.display = "block";
    }
});

let savedScore = localStorage.getItem("wordScrambleScore");
let savedIndex = localStorage.getItem("wordScrambleIndex");

if (savedScore && savedIndex) {
    score = parseInt(savedScore);
    wordIndex = parseInt(savedIndex);
}

shuffleArray(words);
startGame();

window.addEventListener("beforeunload", function (e) {
    localStorage.setItem("wordScrambleScore", score.toString());
    localStorage.setItem("wordScrambleIndex", wordIndex.toString());
});