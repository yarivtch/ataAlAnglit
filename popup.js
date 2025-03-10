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

// פונקציה להמרת טקסט מאנגלית לעברית
function convertEnglishToHebrew(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    result += englishToHebrewMap[char] || char;
  }
  return result;
}

// כפתור המרת טקסט מסומן
document.getElementById('convertSelected').addEventListener('click', () => {
  console.log("נלחץ כפתור 'המר טקסט מסומן'");
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "convertText" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("שגיאה בשליחת הודעה:", chrome.runtime.lastError);
        } else {
          console.log("התקבלה תשובה:", response);
        }
        window.close();
      });
    }
  });
});

// כפתור המרת טקסט מתיבת הקלט
document.getElementById('convertInput').addEventListener('click', () => {
  console.log("נלחץ כפתור 'המר'");
  
  const inputText = document.getElementById('inputText').value;
  if (inputText) {
    const convertedText = convertEnglishToHebrew(inputText);
    document.getElementById('resultText').textContent = convertedText;
    console.log("טקסט מקורי:", inputText);
    console.log("טקסט מומר:", convertedText);
  }
});

// כפתור העתקת התוצאה
document.getElementById('copyResult').addEventListener('click', () => {
  console.log("נלחץ כפתור 'העתק תוצאה'");
  
  const resultText = document.getElementById('resultText').textContent;
  if (resultText) {
    navigator.clipboard.writeText(resultText)
      .then(() => {
        console.log("הטקסט הועתק בהצלחה");
        
        // הצגת הודעת אישור
        const originalText = document.getElementById('copyResult').textContent;
        document.getElementById('copyResult').textContent = 'הועתק!';
        setTimeout(() => {
          document.getElementById('copyResult').textContent = originalText;
        }, 1500);
      })
      .catch(err => {
        console.error("שגיאה בהעתקת הטקסט:", err);
      });
  }
});

// הוספת הודעת אתחול
console.log("popup.js נטען בהצלחה"); 