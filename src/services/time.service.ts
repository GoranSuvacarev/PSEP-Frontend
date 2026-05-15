import {DataService} from "@/services/data.service.ts";
import type {TimetableModel} from "@/models/time.model.ts";

export class TimetableService {
    static async getById(id: number) {
        return await DataService.useAxios<TimetableModel>(`/timetable/${id}`)
    }

    static async create(obj: any) {
        return await DataService.useAxios(`/timetable`, 'post', obj)
    }

    static async update(id: number, obj: any) {
        return await DataService.useAxios(`/timetable/${id}`, 'put', obj)
    }

    static async deleteById(id: number) {
        return await DataService.useAxios(`/timetable/${id}`, 'delete')
    }
}