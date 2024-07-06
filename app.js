// Get references to the DOM elements
let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');

// Initialize an empty array to store todos
let todos = [];

// While the window loading the datas were retrive from the localstorage
window.onload = () => {
    // Taking the stored todos from the local storage
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    // checking the parsed todos were array or not
    if (Array.isArray(storedTodos)) {
        // If it is, assign it to the todos array
        todos = storedTodos;
    }
    // For each todo in the todos array, add it to the DOM
    todos.forEach(todo => addTodo(todo));


    //retriving the values form the COOKIES
    let cookies = document.cookie.split(';');
    console.log(cookies)
    // console.log(cookies)
    var cookiesValue = null;
    for(var cookie of cookies){
        console.log(cookie);
        cookie = cookie.trim();
        console.log(cookie);

        if(cookie.startsWith("Name=")){
            cookiesValue = cookie.substring("Name=".length, cookie.length);
        }
    }

    console.log(cookiesValue);
};




// this add even listner to add the new todos
button.addEventListener('click', () => {
    // Push the value of the input field to the todos array
    todos.push(input.value);
    // Saving the updated todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));


    //storing in cookies
        document.cookie = `${JSON.stringify(todos)}; expires=Sun, 07 july 2024 12:00:00 UTC;`;



    // Adding the new todo to the DOM
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

// Function to remove a todo from the array and update local storage
function remove(todo) {
    // Find the index of the todo in the todos array
    let index = todos.indexOf(todo);
    // If the todo exists in the array
    if (index > -1) {
        // Remove the todo from the array
        todos.splice(index, 1);
    }
    // Save the updated todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}
