let i = 0;
const time = 100;
const text = 'Welcome to Chaindora';

function typeWriter() {
  if (i < text.length) {
    document.getElementById('home').innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, time);
  }
}

typeWriter();
