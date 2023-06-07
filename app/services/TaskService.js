import axios from "axios";

const TODO_API = 'https://api.todoist.com/rest/v2/tasks'
const TODOIST_TOKEN = 'bf2545da4330ffb1d482d3b7a60f4885260baf40'
const PROJECT_ID = '2314216553'

class TaskService {
    static async getAllTasks() {
        try {
            const response = await axios.get(TODO_API, {
                headers: {
                    Authorization: `Bearer ${TODOIST_TOKEN}`
                },
               
            });
            return response.data;
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            throw error;
        }
    }
    static async getTaskById(id){
        // ваша реализация получения одной тудушки
    }   
    static async createNewTask(task) {
      try {
        const response = await axios.post('https://api.todoist.com/rest/v2/tasks', {"content": `${task}`, "due_string": "today", "due_lang": "en", "priority": 4}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TODOIST_TOKEN}`,
            'X-Request-Id':  "23"
          }
        });
  
        console.log('Task created successfully:', response.data);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
    static async updateNewTask(id, task){
        // ваша реализация обновления существующей тудушки по ID
    }
    static async deleteNewTask(id){
    const endpoint = `https://api.todoist.com/rest/v2/tasks/${id}`;

  try {
    const response = await axios.delete(endpoint, {
      headers: {
        'Authorization': `Bearer ${TODOIST_TOKEN}`
      }
    });

    if (response.status === 204) {
      console.log('Task deleted successfully');
    } else {
      console.log('Failed to delete task');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }

        // ваша реализация удаления существующей тудушки по ID
    }
}

export default TaskService;