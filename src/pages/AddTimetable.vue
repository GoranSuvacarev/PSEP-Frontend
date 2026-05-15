<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import { ref } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {CinemaService} from "@/services/cinema.service.ts";
import {MovieService} from "@/services/movie.service.ts";
import {TimetableService} from "@/services/time.service.ts";
import type {MovieModel} from "@/models/movie.model.ts";
import type {CinemaModel} from "@/models/cinema.model.ts";
import type {TimetableModel} from "@/models/time.model.ts";

const router = useRouter()

const timetable = ref({
  cinemaId: 0,
  movieId: 0,
  startTime: '21:00',
  price: 1000
})

const cinemas = ref<CinemaModel[]>()
CinemaService.getCinemas().then(rsp => {
  cinemas.value = rsp.data
  timetable.value.cinemaId = rsp.data[0]!.cinemaId
})

const movies = ref<MovieModel[]>()
MovieService.getAllMovies().then(rsp => {
  movies.value = rsp.data
  timetable.value.movieId = rsp.data[0]!.movieId
})

function create(){
  if (!confirm('Add timetable?'))
    return

  TimetableService.create(timetable.value).then(rsp => {
      router.push(`/details/${timetable.value?.movieId}`)
    })
    .catch(err => alert('Error creating timetable: ' + err.message))
}
</script>

<template>
  <div class="card crud-container" v-if="cinemas && movies" >
    <div class="card-header fw-bold">
      Edit Timetable
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="cinema" class="form-label">Cinema:</label>
        <select class="form-select" id="cinema" v-model="timetable.cinemaId">
          <option v-for="cinema in cinemas" :value="cinema.cinemaId">{{ cinema.name }}
            {{cinema.name}}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="movie" class="form-label">Movie:</label>
        <select class="form-select" id="movie" v-model="timetable.movieId">
          <option v-for="m in movies" :value="m.movieId">
            {{ m.movieId }}  {{ m.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Time:</label>
        <input type="time" class="form-control" id="name" v-model="timetable.startTime">
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Price:</label>
        <input type="text" class="form-control" id="name" v-model="timetable.price">
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-success" @click="create()">
        <i class="fa-solid fa-floppy-disk"></i> Create
      </button>
    </div>
  </div>
  <Loading v-else />
</template>