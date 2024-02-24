var words = document.querySelectorAll('.custom-rich-text-section__heading h2 a');
var wordArray = [];
var currentWord = 0;
words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}
function changeWord() {
  for (var j = 0; j < words.length; j++) {
    var cw = wordArray[j];
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }
    for (var i = 0; i < cw.length; i++) {
      cw[i].className = 'letter behind';
      cw[0].parentElement.style.opacity = 1;
      animateLetterIn(cw, i);
    }
  }
}
function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}
function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}
function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  wordArray.push(letters);
}
changeWord();
setInterval(changeWord, 2000);
