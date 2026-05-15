import type {CinemaModel} from "@/models/cinema.model.ts";

export interface TimetableModel {
    timetableId: number
    cinemaId: number
    movieId: number
    startTime: string
    price: number
    cinema: CinemaModel
}