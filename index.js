const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const answer = document.querySelector(".answer");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // Clear the answer area before processing
  answer.innerHTML = "";

  if (input.value.trim() === "") {
    answer.innerHTML = `<h2>Please write a word to search</h2>`;
    return;
  }

  getWordInfo(input.value.trim());
});

const getWordInfo = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    const wordData = data[0];
    const meaning = wordData.meanings[0];
    const definition = meaning.definitions[0];

    answer.innerHTML = `
      <h2><strong>Word: </strong>${wordData.word}</h2>
      <p class="partof"><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
      <p><strong>Meaning:</strong> ${definition.definition || "Not Found"}</p>
      <p><strong>Example:</strong> ${definition.example || "Not Found"}</p>
      <p><strong>Antonyms:</strong></p>
    `;

    if (definition.antonyms && definition.antonyms.length > 0) {
      answer.innerHTML += `<ul>${definition.antonyms.map((antonym) => `<li>${antonym}</li>`).join("")}</ul>`;
    } else {
      answer.innerHTML += `<p>Not Found</p>`;
    }

    answer.innerHTML += `<div><a href="${wordData.sourceUrls[0]}" target="_blank">Read More</a></div>`;
  } catch (error) {
    answer.innerHTML = `<p>Sorry, the word couldn't be found. Please try again.</p>`;
  }
};
