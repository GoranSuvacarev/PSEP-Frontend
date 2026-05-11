<script setup lang="ts">
import { ref } from 'vue';
import { DataService } from '../services/data.service';
import Loading from "@/components/Loading.vue";

const cinemas = ref<any[]>([]);

DataService.getCinemas().then((response) => {
    cinemas.value = response.data;
})

function remove(cinema: any) {
  if (!confirm(`Are you sure you want to delete ${cinema.name}?`))
    return

  DataService.deleteCinemaById(cinema.cinemaId).then(response => {
    cinemas.value = cinemas.value?.filter(c => c.cinemaId !== cinema.cinemaId)
  })

}


</script>

<template>
  <table class="table table-striped table-hover align-middle" v-if="cinemas">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th class="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="cinema in cinemas" :key="cinema.cinemaId">
        <td>{{ cinema.cinemaId }}</td>
        <td>{{ cinema.name }}</td>
        <td>{{ cinema.address }}</td>
        <td class="text-end">
          <RouterLink :to="`/cinemas/${cinema.cinemaId}`" class="btn btn-sm btn-success me-2">
            Edit
          </RouterLink>
          <button class="btn btn-sm btn-danger" @click="remove(cinema)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Loading v-else />
  <div class="card-footer">
    <RouterLink class="btn btn-sm btn-primary" to="/cinemas/add">
      Create Cinema
    </RouterLink>
  </div>
</template>

<style scoped>

</style>