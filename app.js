document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load existing tasks
    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => addTodoToList(todo));
        });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (task === '') return;

        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        })
        .then(response => response.json())
        .then(todo => {
            addTodoToList(todo);
            input.value = '';
        });
    });

    // Add task to the list
    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo.task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            fetch(`/api/todos/${todo._id}`, {
                method: 'DELETE',
            })
            .then(() => {
                list.removeChild(li);
            });
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    }
});
