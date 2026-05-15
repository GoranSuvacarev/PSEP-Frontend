<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import { CinemaService } from '@/services/cinema.service';
import { ref } from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter()

const cinema = ref({
  name: '',
  address: ''
})

function create(){
  if (!confirm('Create cinema?')) return
  CinemaService.createCinema(cinema.value).then(rsp => {
      router.push('/cinemas')
    })
    .catch(err => alert('Error creating cinema: ' + err.message))
}
</script>

<template>
  <div class="card crud-container">
    <div class="card-header fw-bold">
      Create Cinema
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name" v-model="cinema.name">
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address:</label>
        <input type="text" class="form-control" id="address" v-model="cinema.address">
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-success" @click="create()">
        <i class="fa-solid fa-floppy-disk"></i> Create
      </button>
    </div>
  </div>
</template>