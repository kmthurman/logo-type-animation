const logoElements = document.querySelectorAll('.logo-style');

logoElements.forEach(logoElement => {
  const paragraphs = logoElement.querySelectorAll('p');

  paragraphs.forEach(paragraph => {
    const words = paragraph.textContent.split(' ');

    paragraph.innerHTML = '';

    words.forEach((word, index) => {
      if (index !== 0) {
        const symbol = document.createElement('span');
        symbol.textContent = '-';
        paragraph.appendChild(symbol);
      }

      const letters = word.split('');
      letters.forEach((letter, letterIndex) => {
        const box = document.createElement('span');
        if (letter === '-') {
          box.classList.add('empty-box');
          animateBox(box, letter, ' ', index, letterIndex); // Animate the empty box with space as the target
        } else {
          box.textContent = letter; // Set the initial letter for non-empty boxes
          animateBox(box, letter, undefined, index, letterIndex); // Animate the non-empty box
        }
        paragraph.appendChild(box);
      });
    });
  });
});

function animateBox(box, targetLetter, endCharacter, wordIndex, letterIndex) {
  const characters = getCharacters();
  const targetIndex = characters.indexOf(targetLetter);
  box.classList.add('empty-box-white-bg');

  let currentIndex = 0;

  const delay = wordIndex * 300 + letterIndex * 100; // Delay calculation based on word and letter position

  setTimeout(() => {
    const intervalId = setInterval(() => {
      box.textContent = characters[currentIndex];

      if (currentIndex === targetIndex) {
        clearInterval(intervalId);
        if (box.classList.contains('empty-box')) {
          box.textContent = endCharacter;
          box.style.backgroundColor = '#4F0D74'; // Set the purple background color at the end
        }
      }

      currentIndex++;
      if (currentIndex >= characters.length) {
        currentIndex = 0;
      }
    }, 100);
  }, delay);
}

function getCharacters() {
  const characters = [];
  for (let i = 33; i <= 126; i++) {
    characters.push(String.fromCharCode(i));
  }
  return characters;
}
