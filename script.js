document.addEventListener("DOMContentLoaded", () => {
  // to ensure the DOM is fully loaded before running the script
  const addTaskBtn = document.getElementById("add-task-btn"); // Get the button to add tasks
  const taskInput = document.getElementById("task-input"); // Get the input field for task text
  const toDoList = document.getElementById("to-do-list"); // Get the unordered list where tasks will be displayed
  tasks = JSON.parse(localStorage.getItem("task")) || []; // Retrieve tasks from localStorage or initialize an empty array if none exist
  tasks.forEach((element) => {
    // Loop through each task in the array
    renderTasks(element); // Call the renderTasks function to display each task
  });
  addTaskBtn.addEventListener("click", () => {
    // Add an event listener to the button for click events
    // When the button is clicked, check if the input field is empty
    const taskText = taskInput.value.trim(); // Get the text from the input field and trim whitespace
    // If the input field is empty, alert the user to enter a task
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }
    const Newtask = {
      // Create a new task object
      id: Date.now(), // Use the current timestamp as a unique ID
      text: taskText, // Set the text of the task
      completed: false, // Set the completed status to false
    };
    tasks.push(Newtask); // Add the new task to the task array
    saveTask(); // Save the updated task array to localStorage
    renderTasks(Newtask); // Call the renderTasks function to display the new task
    taskInput.value = ""; // Clear the input field
    console.log(tasks); // Log the current task array to the console
  });
  function renderTasks(task) {
    // Function to render a task in the list
    const li = document.createElement("li"); // Create a new list item element
    li.setAttribute("data-id", task.id); // Set a custom attribute to store the task ID
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`; // Set the inner HTML of the list item to display the task text
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed; // Toggle the completed status of the task when clicked
      li.classList.toggle("completed"); // Toggle the "completed" class for styling
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click event from bubbling up to the list item
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove(); // Remove the list item from the DOM
      saveTask(); // Save the updated task array to localStorage
    });
    toDoList.appendChild(li); // Append the list item to the unordered list
  }
  function saveTask() {
    // Function to save the task array to localStorage
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
