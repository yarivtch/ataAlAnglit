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

// פונקציה להחלפת טקסט בשדה קלט
function replaceTextInInputField(inputElement, convertedText) {
  const start = inputElement.selectionStart;
  const end = inputElement.selectionEnd;
  const selectedText = inputElement.value.substring(start, end);
  
  if (selectedText) {
    const newValue = inputElement.value.substring(0, start) + 
                     convertedText + 
                     inputElement.value.substring(end);
    inputElement.value = newValue;
    inputElement.selectionStart = start;
    inputElement.selectionEnd = start + convertedText.length;
  }
}

// פונקציה להחלפת טקסט באלמנט עריכה
function replaceTextInEditableElement(convertedText) {
  document.execCommand('insertText', false, convertedText);
}

// פונקציה ראשית להחלפת הטקסט המסומן
function replaceSelectedText() {
  console.log("פונקציית replaceSelectedText הופעלה");
  
  const selection = window.getSelection();
  if (!selection || selection.toString().length === 0) {
    console.log("אין טקסט מסומן");
    return;
  }
  
  const selectedText = selection.toString();
  console.log("טקסט מסומן:", selectedText);
  
  const convertedText = convertEnglishToHebrew(selectedText);
  console.log("טקסט מומר:", convertedText);
  
  // בדיקה אם הפוקוס נמצא בשדה קלט
  const activeElement = document.activeElement;
  const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  const isEditable = activeElement.isContentEditable || activeElement.contentEditable === 'true';
  
  console.log("אלמנט פעיל:", activeElement.tagName);
  console.log("האם שדה קלט:", isInput);
  console.log("האם אלמנט עריכה:", isEditable);
  
  try {
    if (isInput) {
      replaceTextInInputField(activeElement, convertedText);
      console.log("הוחלף טקסט בשדה קלט");
    } else if (isEditable) {
      replaceTextInEditableElement(convertedText);
      console.log("הוחלף טקסט באלמנט עריכה");
    } else {
      // החלפת טקסט רגיל בדף
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(convertedText));
      console.log("הוחלף טקסט רגיל בדף");
    }
  } catch (error) {
    console.error("שגיאה בהחלפת הטקסט:", error);
  }
}

// האזנה להודעות מ-background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("התקבלה הודעה:", message);
  
  if (message.action === "convertText") {
    replaceSelectedText();
    
    // שליחת אישור קבלה
    if (sendResponse) {
      sendResponse({ status: "success" });
    }
    return true; // חשוב להחזיר true כדי לאפשר תקשורת אסינכרונית
  }
});

// האזנה לקיצור מקלדת ישירות בדף
document.addEventListener('keydown', (event) => {
  // בדיקה אם הקיצור הוא Ctrl+Shift+Y או Command+Shift+Y
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'Y' || event.key === 'y')) {
    console.log("זוהה קיצור מקלדת Ctrl+Shift+Y");
    replaceSelectedText();
    event.preventDefault();
  }
});

// הודעת אתחול
console.log("תוסף ataAlAnglit נטען בהצלחה"); 