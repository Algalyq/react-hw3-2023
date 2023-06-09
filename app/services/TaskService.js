import axios from "axios";

const api = process.env.NEXT_PUBLIC_TODO_API
const token = process.env.NEXT_PUBLIC_TODOIST_API_KEY;
const project_id = process.env.NEXT_PUBLIC_PROJECT_ID;


class TaskService {
    static async getAllTasks() {
        try {
          console.log(token)
            const response = await axios.get(api, {
              headers: {
                Authorization: `Bearer ${token}`
              },
              params: {
                project_id: project_id
              }
            });
            console.log(token)
            console.log(response.data)
            return response.data;
          } catch (error) {
            console.error("Error getting tasks:", error);
            throw error;
          }
    }
    static async getTaskById(id){
        try {
            const response = await axios.get(`${api}/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
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
          console.log(task)
            const response = await axios.post(api, {"content": `${task}`, "due_string": "today", "due_lang": "en", "priority": 4}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
              params: {
                project_id: project_id
              }
            });
            console.log(response.data)
            return response.data;
          } catch (error) {
            console.error("Error creating task:", error);
            throw error;
          }
    }
    static async CloseTask(task) {
        try {
          const response = await axios.post(`${api}/${task.id}/close`, task, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error(`Error updating task with ID ${id}:`, error);
          throw error;
        }
      }
         static async OpenTask(task) {
        try {
          const response = await axios.post(`${api}/${task.id}/reopen`, task, {
            headers: {
              Authorization: `Bearer ${token}`
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
            const response = await axios.delete(`${api}/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
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