<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'
import type { MovieModel } from '@/models/movie.model'
import {MovieService} from "@/services/movie.service.ts";
import type {TimetableModel} from "@/models/time.model.ts";
import {TimetableService} from "@/services/time.service.ts";

const route = useRoute()
const id = Number(route.params.id)

const movie = ref<MovieModel>()
const loading = ref(true)
const error = ref<string | null>(null)

const genres = computed(() => {
  return movie.value?.movieGenres.map((movieGenre) => movieGenre.genre.name).join(', ') || 'No genres available'
})

const actors = computed(() => {
  return movie.value?.movieActors.map((movieActor) => movieActor.actor.name) || []
})

const projections = computed(() => {
  return [...(movie.value?.timetables || [])].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })
})

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

const formatProjectionDate = (time: string) => {
  return time.slice(0, 5)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'DIN',
  }).format(price)
}

const handleProjectionClick = (timetableId: number) => {
  console.log(`Ticket purchase placeholder for timetable ID: ${timetableId}`)
}

MovieService.getById(id)
    .then((rsp) => {
      movie.value = rsp.data
      document.title = `${rsp.data.title} | PSEP 2026`
    })
    .catch(() => {
      error.value = 'Movie details could not be loaded.'
    })
    .finally(() => {
      loading.value = false
    })

function remove(timetable: TimetableModel) {
  if (!confirm(`Are you sure you want to delete ${timetable.cinema?.name}?`))
    return
  TimetableService.deleteById(timetable.timetableId).then(response => {
    movie.value!.timetables = movie.value!.timetables.filter(t => t.timetableId !== timetable.timetableId)
  })
}
</script>

<template>
  <main class="container py-5">
    <Loading v-if="loading" />

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <template v-else-if="movie">
      <section class="card border-0 shadow movie-details">
        <div class="row g-0">
          <div class="col-md-4">
            <img
                :src="movie.poster"
                :alt="movie.title"
                class="movie-poster"
            />
          </div>

          <div class="col-md-8">
            <div class="card-body p-4">
              <div class="d-flex flex-wrap gap-2 mb-3">
                <span class="badge text-bg-primary">
                  {{ movie.runTime }} min
                </span>

                <span
                    class="badge"
                    :class="movie.active ? 'text-bg-success' : 'text-bg-secondary'"
                >
                  {{ movie.active ? 'Active' : 'Inactive' }}
                </span>

                <span class="badge text-bg-light border">
                  {{ formatDate(movie.startDate) }}
                </span>
              </div>

              <h1 class="card-title mb-2">
                {{ movie.title }}
              </h1>

              <h2
                  v-if="movie.originalTitle && movie.originalTitle !== movie.title"
                  class="h5 text-body-secondary mb-4"
              >
                {{ movie.originalTitle }}
              </h2>

              <p class="lead">
                {{ movie.shortDescription }}
              </p>

              <hr />

              <h3 class="h5">Description</h3>
              <p class="text-body-secondary">
                {{ movie.description }}
              </p>

              <div class="row mt-4">
                <div class="col-md-6 mb-3">
                  <h3 class="h6 text-uppercase text-body-secondary">
                    Director
                  </h3>
                  <p class="mb-0 fw-semibold">
                    {{ movie.director.name }}
                  </p>
                </div>

                <div class="col-md-6 mb-3">
                  <h3 class="h6 text-uppercase text-body-secondary">
                    Genres
                  </h3>
                  <p class="mb-0">
                    {{ genres }}
                  </p>
                </div>
              </div>

              <div class="mt-3">
                <h3 class="h6 text-uppercase text-body-secondary">
                  Actors
                </h3>

                <div v-if="actors.length" class="d-flex flex-wrap gap-2">
                  <span
                      v-for="actor in actors"
                      :key="actor"
                      class="badge rounded-pill text-bg-light border actor-badge"
                  >
                    {{ actor }}
                  </span>
                </div>

                <p v-else class="text-body-secondary mb-0">
                  No actors available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card border-0 shadow mt-4 projections-section">
        <div class="card-body p-4">
          <h3 class="h5 mb-3">
            Available projections
          </h3>

          <div v-if="projections.length" class="projection-grid">
            <button
                v-for="projection in projections"
                :key="projection.timetableId"
                type="button"
                class="card projection-card text-start border shadow-sm"
                @click="handleProjectionClick(projection.timetableId)"
            >
              <span class="card-body">
                <span class="d-flex justify-content-between gap-3 mb-2">
                  <span class="fw-semibold">
                    {{ formatProjectionDate(projection.startTime) }}
                  </span>

                  <span class="badge text-bg-primary projection-price">
                    {{ formatPrice(projection.price) }}
                  </span>
                </span>

                <span class="d-block text-body-secondary">
                  Cinema: {{ projection.cinema.name.trim() }}
                </span>

                <span class="d-block small text-body-secondary mt-2">
                  Click to buy ticket
                </span>

                    <span class="d-flex gap-2 mt-4">
                      <RouterLink
                          :to="'/timetable/' + projection.timetableId"
                          class="btn btn-sm btn-outline-primary"
                          @click.stop
                      >
                        Edit
                      </RouterLink>

                      <button
                          type="button"
                          class="btn btn-sm btn-outline-danger"
                          @click="remove(projection)"
                      >
                        Delete
                      </button>
                    </span>
                  </span>
                </button>

              </div>

          <p v-else class="text-body-secondary mb-0">
            No projections are currently available for this movie.
          </p>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.movie-details {
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
  display: block;
}

.actor-badge {
  font-size: 0.9rem;
  padding: 0.55rem 0.75rem;
}

.projection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.projection-card {
  width: 100%;
  color: inherit;
  background: var(--bs-body-bg);
  transition:
      transform 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease;
}

.projection-card:hover,
.projection-card:focus-visible {
  transform: translateY(-2px);
  border-color: var(--bs-primary) !important;
  box-shadow: 0 0.5rem 1rem rgba(var(--bs-primary-rgb), 0.2) !important;
}

.projection-price {
  white-space: nowrap;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.details-grid div {
  display: flex;
  flex-direction: column;
}

@media (max-width: 767.98px) {
  .movie-poster {
    min-height: auto;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>