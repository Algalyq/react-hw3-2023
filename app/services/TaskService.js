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
              params: {
                project_id: PROJECT_ID
              }
            });
            console.log(response.data)
            return response.data;
          } catch (error) {
            console.error("Error getting tasks:", error);
            throw error;
          }
    }
    static async getTaskById(id){
        try {
            const response = await axios.get(`${TODO_API}/${id}`, {
              headers: {
                Authorization: `Bearer ${TODOIST_TOKEN}`
              }
            });
            return response.data;
          } catch (error) {
            console.error(`Error getting task with ID ${id}:`, error);
            throw error;
          }
    }   
    static async createNewTask(task) {
        try {
            const response = await axios.post(TODO_API, {"content": `${task}`, "due_string": "today", "due_lang": "en", "priority": 4}, {
              headers: {
                Authorization: `Bearer ${TODOIST_TOKEN}`
              },
              params: {
                project_id: PROJECT_ID
              }
            });
            console.log(response.data)
            return response.data;
          } catch (error) {
            console.error("Error creating task:", error);
            throw error;
          }
    }
    static async updateNewTask(task) {
        try {
          const response = await axios.post(`${TODO_API}/${task.id}/close`, task, {
            headers: {
              Authorization: `Bearer ${TODOIST_TOKEN}`
            }
          });
          return response.data;
        } catch (error) {
          console.error(`Error updating task with ID ${id}:`, error);
          throw error;
        }
      }
    static async deleteNewTask(id){
        try {
            const response = await axios.delete(`${TODO_API}/${id}`, {
              headers: {
                Authorization: `Bearer ${TODOIST_TOKEN}`
              }
            });
            return response.data;
          } catch (error) {
            console.error(`Error deleting task with ID ${id}:`, error);
            throw error;
          }
        }
    }


export default TaskService;