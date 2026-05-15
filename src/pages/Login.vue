<script setup lang="ts">
import { ref } from 'vue'
import {DataService} from "@/services/data.service.ts";
import {useRouter} from "vue-router";
import {AuthService} from "@/services/auth.service.ts";

const router = useRouter()
const auth = ref({
  email: '',
  password: ''
})

function login() {
  DataService.login(auth.value).then(rsp => {
      AuthService.saveAuth(rsp.data)
      router.push('/')
    }
)}
</script>

<template>
  <div class="card crud-container">
    <div class="card-header fw-bold">
      Login
    </div>

    <div class="card-body">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            id="email"
            v-model="auth.email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            required
          >
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            id="password"
            v-model="auth.password"
            type="password"
            class="form-control"
            placeholder="Enter password"
            required
          >
        </div>

        <button type="submit" class="btn btn-primary" @click="login">
          <i class="fa-solid fa-right-to-bracket"></i> Login
        </button>
        <RouterLink to="/signup" class="btn btn-link">
          <button type="button" class="btn btn-secondary"><i class="fa-solid fa-user-pen"></i> Create an account</button>
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>