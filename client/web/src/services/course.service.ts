import axios from "@/libs/apis/axios"
import type { AgentFormData } from "@/libs/validations/agent.schema";

export const generateCourseOutline = async (data: AgentFormData) => {
    const response = await axios.post('/courses/generate/', data, {
        timeout: 10000,
    })
    return response.data;
}