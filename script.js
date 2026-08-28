const userText = document.getElementById("userText");
const resultBox = document.getElementById("resultBox");
const simplifyBtn = document.getElementById("simplifyBtn");
const summarizeBtn = document.getElementById("summarizeBtn");
const explainBtn = document.getElementById("explainBtn");
const readAloudBtn = document.getElementById("readAloudBtn");
const decreaseText = document.getElementById("decreaseText");
const resetText = document.getElementById("resetText");
const increaseText = document.getElementById("increaseText");
const contrastBtn = document.getElementById("contrastBtn");


// Simplify
simplifyBtn.addEventListener("click", async function () {
    const text = userText.value.trim();

    if (text === "") {
        resultBox.innerHTML = "<p>Please enter some text first.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Processing...</p>";

    try {
        const response = await fetch("/api/simplify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (!response.ok) {
            resultBox.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        resultBox.innerHTML = `
            <p>
                <strong>Simplified version:</strong>
            </p>
            <p>
                ${data.result}
            </p>
        `;

    } catch (error) {
        resultBox.innerHTML = `
            <p>Unable to connect to the server.</p>
        `;

        console.error(error);
    }
});


// Summarize
summarizeBtn.addEventListener("click", async function () {
    const text = userText.value.trim();

    if (text === "") {
        resultBox.innerHTML = "<p>Please enter some text first.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Creating summary...</p>";

    try {
        const response = await fetch("/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (!response.ok) {
            resultBox.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        resultBox.innerHTML = `
            <p>
                <strong>Summary:</strong>
            </p>
            <p>
                ${data.result}
            </p>
        `;

    } catch (error) {
        resultBox.innerHTML = `
            <p>Unable to connect to the server.</p>
        `;

        console.error(error);
    }
});


// Explain
explainBtn.addEventListener("click", async function () {
    const text = userText.value.trim();

    if (text === "") {
        resultBox.innerHTML = "<p>Please enter some text first.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Creating explanation...</p>";

    try {
        const response = await fetch("/api/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (!response.ok) {
            resultBox.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        resultBox.innerHTML = `
            <p>
                <strong>Explanation:</strong>
            </p>
            <p>
                ${data.result}
            </p>
        `;

    } catch (error) {
        resultBox.innerHTML = `
            <p>Unable to connect to the server.</p>
        `;

        console.error(error);
    }
});


// Read aloud
readAloudBtn.addEventListener("click", function () {
    const text = resultBox.innerText;

    if (text.trim() === "") {
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});


// Increase text
increaseText.addEventListener("click", function () {
    const currentSize = parseFloat(
        getComputedStyle(document.body).fontSize
    );

    document.body.style.fontSize = `${currentSize + 2}px`;
});


// Decrease text
decreaseText.addEventListener("click", function () {
    const currentSize = parseFloat(
        getComputedStyle(document.body).fontSize
    );

    if (currentSize > 12) {
        document.body.style.fontSize = `${currentSize - 2}px`;
    }
});


// Reset text
resetText.addEventListener("click", function () {
    document.body.style.fontSize = "16px";
});


// High contrast
contrastBtn.addEventListener("click", function () {
    document.body.classList.toggle("high-contrast");
});