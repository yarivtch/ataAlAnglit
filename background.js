// מפת המרה מאנגלית לעברית
const englishToHebrewMap = {
  'a': 'ש',
  'b': 'נ',
  'c': 'ב',
  'd': 'ג',
  'e': 'ק',
  'f': 'כ',
  'g': 'ע',
  'h': 'י',
  'i': 'ן',
  'j': 'ח',
  'k': 'ל',
  'l': 'ך',
  'm': 'צ',
  'n': 'מ',
  'o': 'ם',
  'p': 'פ',
  'q': '/',
  'r': 'ר',
  's': 'ד',
  't': 'א',
  'u': 'ו',
  'v': 'ה',
  'w': '\'',
  'x': 'ס',
  'y': 'ט',
  'z': 'ז',
  '/': 'ף',
  '\'': 'ת',
  ',': 'ת',
  '.': 'ץ',
  ';': 'ף',
  '[': 'מ',
  ']': 'ץ',
  '\\': 'ף',
  '`': ';',
  '-': '-',
  '=': '=',
  ' ': ' ',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0'
};

// יצירת תפריט קליק ימני
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertToHebrew",
    title: "המר לעברית",
    contexts: ["selection"]
  });
});

// טיפול בלחיצה על תפריט הקליק הימני
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToHebrew") {
    chrome.tabs.sendMessage(tab.id, { action: "convertText" });
  }
});

// טיפול בקיצור מקלדת
chrome.commands.onCommand.addListener((command) => {
  if (command === "convert-text") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "convertText" });
      }
    });
  }
}); 