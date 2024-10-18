import { useState } from "react";

function ListTasks() {
    const [tasks, setTasks] = useState([
        { text: "Waking up at 5", completed: false },
        { text: "Praying", completed: false },
        { text: "Studying 2h", completed: false },
    ]);

    const [inputValue, setInputValue] = useState(""); // State for the input field

    function addTask() {
        if (inputValue.trim() === '') {
            alert('Le champ ne peut pas être vide');
            return; // Exit the function if the input is empty
        } else {
            setTasks([...tasks, { text: inputValue, completed: false }]); // Add new task
            setInputValue(""); // Clear input field
        }
    }

    function handleUp(index) {
        if (index === 0) return; // Do nothing if the first item
        const updatedTasks = [...tasks];
        // Swap the current task with the previous one
        [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
        setTasks(updatedTasks);
    }

    function handleDown(index) {
        if (index === tasks.length - 1) return; // Do nothing if the last item
        const updatedTasks = [...tasks];
        // Swap the current task with the next one
        [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
        setTasks(updatedTasks);
    }

    function handleDelete(index) {
        setTasks(tasks.filter((_, ind) => ind !== index)); // Corrected to filter tasks
    }

    function changeStatus(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <>
            <div className="container">
                <div className="head">
                    <h3>Tasks</h3>
                    <img src="./src/assets/car.jpg" alt="yata" />
                </div>
                <div className="display-list">
                    <ol>
                        {tasks.map((task, index) => (
                            <li
    onClick={() => changeStatus(index)}
    key={index}
    style={{ textDecoration: task.completed ? 'line-through' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} // Use flex for li
>
    <span>{task.text}</span>
    <div>
        <button onClick={(e) => { e.stopPropagation(); handleUp(index); }}>Up 🔺</button>
        <button onClick={(e) => { e.stopPropagation(); handleDown(index); }}>Down 🔻</button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Del 🗑️</button>
    </div>
</li>
                        ))}
                    </ol>
                </div>
                <div className="task-input-container"> {/* Added class name */}
                    <h2>Add New Task</h2>
                    <input
                        placeholder="Add new Task here ..."
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Update input value
                    />
                    <button onClick={addTask}>Add🖌️</button>
                </div>
            </div>
        </>
    );
}

export default ListTasks;
