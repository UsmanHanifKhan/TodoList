import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
    const { id } = useParams();
    console.log(id);

    const [taskDetails, setTaskDetails] = useState(null);

    // Fetch Task Details from Local Storage if it was added manually
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                // Try fetching task details from API
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
                const taskDetailsData = response.data;
                setTaskDetails(taskDetailsData);
            } catch (error) {
                // If API fetch fails, try fetching from local storage
                const localStorageData = JSON.parse(localStorage.getItem('todos'));
                const taskDetailsFromLocalStorage = localStorageData.find(todo => todo.id === parseInt(id, 10));
                setTaskDetails(taskDetailsFromLocalStorage);
            }
        };

        fetchTaskDetails();
    }, [id]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div>Task Details</div>
            {taskDetails && (
                <>
                    <div>{taskDetails.id}</div>
                    <div>{taskDetails.title}</div>
                    <div>{taskDetails.description}</div>
                </>
            )}
        </div>
    );
}

export default TaskDetails;
