const windowSize = 10;
let numberWindow = [];

function updateWindow(newNumbers) {
  const uniqueNew = newNumbers.filter(num => !numberWindow.includes(num));

  numberWindow = [...numberWindow, ...uniqueNew];
  if (numberWindow.length > windowSize) {
    numberWindow = numberWindow.slice(-windowSize);
  }

  return numberWindow;
}

function getWindowState() {
  return [...numberWindow];
}

function clearWindow() {
  numberWindow = [];
}

module.exports = { updateWindow, getWindowState, clearWindow };
