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
  console.log("תפריט קליק ימני נוצר בהצלחה");
});

// טיפול בלחיצה על תפריט הקליק הימני
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToHebrew") {
    console.log("נלחץ תפריט 'המר לעברית'");
    
    chrome.tabs.sendMessage(tab.id, { action: "convertText" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("שגיאה בשליחת הודעה:", chrome.runtime.lastError);
      } else {
        console.log("התקבלה תשובה:", response);
      }
    });
  }
});

// טיפול בקיצור מקלדת
chrome.commands.onCommand.addListener((command) => {
  if (command === "convert-text") {
    console.log("הופעל קיצור מקלדת:", command);
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "convertText" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("שגיאה בשליחת הודעה:", chrome.runtime.lastError);
          } else {
            console.log("התקבלה תשובה:", response);
          }
        });
      }
    });
  }
});

// הודעת אתחול
console.log("background script נטען בהצלחה"); 