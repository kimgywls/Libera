import axios from "axios";
import { API_URL } from "@/app/constants";

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchAttendance(student_id: number) {
    const res = await api.get(`/api/v1/attendance/${student_id}`);
    console.log("fetchAttendance", res.data);
    return res.data; // StudentAttendance[] 형태 예상
}
