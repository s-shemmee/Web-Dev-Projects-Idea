// Selecting the necessary elements
const addBox = document.querySelector('.add-box'); // The add box element
const popupBox = document.querySelector('.popup-box'); // The popup box element
const popupTitle = popupBox.querySelector('header p'); // The title element inside the popup box
const closeIcon = document.querySelector('header i'); // The close icon element
const titleEl = document.querySelector('input'); // The title input element
const descEl = document.querySelector('textarea'); // The description textarea element
const addBtn = document.querySelector('button'); // The add button element

// Array of month names
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Retrieve notes from local storage or initialize an empty array
const notes = JSON.parse(localStorage.getItem('notes') || '[]');

// Variables for updating notes
let isUpdate = false;
let updateId;

// Function to display notes on the screen
function showNotes() {
    // Remove all existing note elements
    document.querySelectorAll('.note').forEach(note => note.remove());

    // Loop through each note and create a list item element
    notes.forEach((note, index) => {
        let liEl = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        // Insert the list item element after the add box element
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}

// Show the initial notes on page load
showNotes();

// Function to delete a note
function deleteNote(noteId) {
    // Ask for confirmation before deleting the note
    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    // Remove the note from the notes array
    notes.splice(noteId, 1);

    // Update the notes in local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Refresh the displayed notes on the screen
    showNotes();
}

// Function to update a note
function updateNote(noteId, title, desc) {
    // Set the update flag and update ID
    isUpdate = true;
    updateId = noteId;

    // Trigger a click event on the add box to open the popup
    addBox.click();

    // Set the values of the title and description inputs to the existing values
    titleEl.value = title;
    descEl.value = desc;

    // Update the button text and popup title
    addBtn.innerText = 'Edit Note';
    popupTitle.innerText = 'Editing a Note';
}

// Event listener for add box click
addBox.addEventListener('click', () => {
    titleEl.focus(); // Focus on the title input
    popupBox.classList.add('show'); // Show the popup box
});

// Event listener for close icon click
closeIcon.addEventListener('click', () => {
    isUpdate = false; // Reset the update flag
    titleEl.value = ''; // Clear the title input
    descEl.value = ''; // Clear the description textarea
    addBtn.innerText = 'Add Note'; // Reset the button text
    popupTitle.innerText = 'Add a new Note'; // Reset the popup title
    popupBox.classList.remove('show'); // Hide the popup box
});

// Event listener for add button click
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let noteTitle = titleEl.value; // Get the note title from the input
    let noteDesc = descEl.value; // Get the note description from the textarea

    if (noteTitle || noteDesc) {
        let dateEl = new Date();
        let month = months[dateEl.getMonth()]; // Get the current month
        let day = dateEl.getDate(); // Get the current day
        let year = dateEl.getFullYear(); // Get the current year

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        };

        if (!isUpdate) {
            // Add the new note to the notes array
            notes.push(noteInfo);
        } else {
            isUpdate = false; // Reset the update flag
            notes[updateId] = noteInfo; // Update the existing note in the notes array
        }

        // Update the notes in local storage
        localStorage.setItem('notes', JSON.stringify(notes));

        // Trigger a click event on the close icon to close the popup
        closeIcon.click();

        // Refresh the displayed notes on the screen
        showNotes();
    }
});
