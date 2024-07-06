// Get references to the DOM elements
let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');

// Initialize an empty array to store todos
let todos = [];

// When the window loads, retrieve stored todos from localStorage
window.onload = () => {
    // Retrieve the stored todos from localStorage and parse them as JSON
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    // Check if the parsed storedTodos is an array
    if (Array.isArray(storedTodos)) {
        // If it is, assign it to the todos array
        todos = storedTodos;
    }
    // For each todo in the todos array, add it to the DOM
    todos.forEach(todo => addTodo(todo));
};

// Add an event listener to the button to handle adding new todos
button.addEventListener('click', () => {
    // Push the value of the input field to the todos array
    todos.push(input.value);
    // Save the updated todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
    // Add the new todo to the DOM
    addTodo(input.value);
    // Clear the input field
    input.value = '';
});

// Function to add a todo item to the DOM
function addTodo(todo) {
    // Create a new paragraph element
    let para = document.createElement('p');
    // Set the text of the paragraph to the todo
    para.innerText = todo;
    // Append the paragraph to the todoList
    todoList.appendChild(para);
    
    // Add an event listener to mark the todo as done on click
    para.addEventListener('click', () => {
        // Set a line-through style on the text to mark it as done
        para.style.textDecoration = 'line-through';
        // Remove the todo from the array and localStorage
        remove(todo);
    });

    // Add an event listener to remove the todo on double-click
    para.addEventListener('dblclick', () => {
        // Remove the paragraph from the DOM
        todoList.removeChild(para);
        // Remove the todo from the array and localStorage
        remove(todo);
    });
}

// Function to remove a todo from the array and update localStorage
function remove(todo) {
    // Find the index of the todo in the todos array
    let index = todos.indexOf(todo);
    // If the todo exists in the array
    if (index > -1) {
        // Remove the todo from the array
        todos.splice(index, 1);
    }
    // Save the updated todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}