const submit = document.getElementById("submit")
const empty = document.querySelector("#remove")
const mainContainer = document.querySelector(".main-container")
const addNoteBtn = document.querySelector("#addNotes")
const notesContainer = document.querySelector(".notes-container");
const boxContainer = document.querySelector(".box-container")
const textContainer = document.querySelector(".containers")
let textareaValue = textContainer.querySelector('#note-text');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addNoteBtn.addEventListener('click', () => {
    textareaValue.value = "";
    textContainer.classList.toggle("none")
})
empty.addEventListener('click', (e) => {
    e.preventDefault();

    textareaValue.value = "";
})
function getRandomLightColor() {
    const threshold = 150;
    
    const red = Math.floor(Math.random() * (255 - threshold) + threshold);
    const green = Math.floor(Math.random() * (255 - threshold) + threshold);
    const blue = Math.floor(Math.random() * (255 - threshold) + threshold);

    const redDiff = 255 - red;
    const greenDiff = 255 - green;
    const blueDiff = 255 - blue;

    const lightRed = red + Math.floor(Math.random() * redDiff);
    const lightGreen = green + Math.floor(Math.random() * greenDiff);
    const lightBlue = blue + Math.floor(Math.random() * blueDiff);
    const color = `rgb(${lightRed}, ${lightGreen}, ${lightBlue})`;

    return color;
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
        if (textareaValue.value != "") {
            const randomRotation = (Math.random() - 0.5) * 100;
            const color = getRandomLightColor();

            notesContainer.innerHTML +=
                `<div class="box-container" style="transform: rotate(${randomRotation}deg);">
            <textarea disabled style="background-color:${color};">${textareaValue.value}</textarea>
            <button class="delete">x</button>
        </div>`;
            tasks.push(textareaValue.value);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            textContainer.classList.toggle("none");
            deleteNotes();//if i call the function outside the box then all buttons value is null thats why i call this funciton inside the submit 
        }
})

function deleteNotes() {
    let deleteNotesBtn = document.querySelectorAll(".delete");
    deleteNotesBtn.forEach(function (button) {
        button.addEventListener('click', (event) => {
            event.target.parentElement.remove();
            let taskText = event.target.parentElement.querySelector('textarea').value.trim();
            let index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                // Save tasks to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            });
    });
}

function loadTasks() {
    tasks.forEach(function (notes) {
        const randomRotation = (Math.random() - 0.5) * 100;
        const color = getRandomLightColor();
        notesContainer.innerHTML +=
            `<div class="box-container" style="transform: rotate(${randomRotation}deg);">
        <textarea disabled style="background-color:${color};">${notes}</textarea>
        <button class="delete">x</button>
    </div>`
        deleteNotes()
    });
}
loadTasks();

/*
submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (textareaValue.value != "") {
        if (textareaValue.value != "") {
            normal long old code
            let boxContainer = document.createElement('div');
            boxContainer.classList.add('box-container')
            let createNotes = document.createElement('textarea')
            createNotes.value = textareaValue.value;
            createNotes.setAttribute('disabled', true);
            let deletebtn = document.createElement('button');
            deletebtn.setAttribute("id", "delete");
            deletebtn.textContent = "x";
            notesContainer.appendChild(boxContainer);
            boxContainer.appendChild(createNotes);
            boxContainer.appendChild(deletebtn);
            textContainer.classList.toggle("none")
        }
    }
})*/
