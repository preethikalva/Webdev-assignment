const canvas = document.getElementById('canvas');
const fontStyle = document.getElementById('font-style');
const fontSize = document.getElementById('font-size');
const boldBtn = document.getElementById('bold-btn');
const italicBtn = document.getElementById('italic-btn');
const underlineBtn = document.getElementById('underline-btn');
const textAlign = document.getElementById('text-align');
const addTextBtn = document.getElementById('add-text-btn');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');

let selectedElement = null;
let undoStack = [];
let redoStack = [];

// Add Text Functionality
addTextBtn.addEventListener('click', () => {
    const newText = document.createElement('div');
    newText.contentEditable = true;
    newText.innerText = 'New Text';
    canvas.appendChild(newText);
    makeDraggable(newText);
});

// Make Text Draggable
function makeDraggable(element) {
    let isDragging = false;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        selectedElement = element;
        undoStack.push(canvas.innerHTML);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = e.pageX - canvas.offsetLeft + 'px';
            element.style.top = e.pageY - canvas.offsetTop + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Change Font Style
fontStyle.addEventListener('change', () => {
    if (selectedElement) {
        selectedElement.style.fontFamily = fontStyle.value;
    }
});

// Change Font Size
fontSize.addEventListener('input', () => {
    if (selectedElement) {
        selectedElement.style.fontSize = fontSize.value + 'px';
    }
});

// Bold Text
boldBtn.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontWeight = selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
    }
});

// Italic Text
italicBtn.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.fontStyle = selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
    }
});

// Underline Text
underlineBtn.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.style.textDecoration = selectedElement.style.textDecoration === 'underline' ? 'none' : 'underline';
    }
});

// Align Text
textAlign.addEventListener('change', () => {
    if (selectedElement) {
        selectedElement.style.textAlign = textAlign.value;
    }
});

// Undo and Redo
undoBtn.addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(canvas.innerHTML);
        canvas.innerHTML = undoStack.pop();
    }
});

redoBtn.addEventListener('click', () => {
    if (redoStack.length > 0) {
        undoStack.push(canvas.innerHTML);
        canvas.innerHTML = redoStack.pop();
    }
});
