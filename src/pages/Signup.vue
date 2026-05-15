<script setup lang="ts">
import { ref } from 'vue'
import {DataService} from "@/services/data.service.ts";
import router from "@/router";

const email = ref<string>('')
const password = ref<string>('')
const repeatPassword = ref<string>('')
const first_name = ref<string>('')
const last_name = ref<string>('')
const gender = ref('M')

const payload = ref({
  email: email,
  password: password,
  repeatPassword: repeatPassword,
  firstName: first_name,
  lastName: last_name,
  gender: gender
})

function signup() {
  if (payload.value.email == '' || payload.value.password == '')
    return
  if (payload.value.firstName == '' || payload.value.lastName == '')
    return
  if (payload.value.repeatPassword !== payload.value.password)
    return

  DataService.register(payload.value).then(rsp => {
    sessionStorage.setItem('verifyEmail', payload.value.email)
    router.push('/verify')
  })
}
</script>

<template>
  <div class="card crud-container">
    <div class="card-header fw-bold">
      Register
    </div>

    <div class="card-body">
      <form @submit.prevent="signup">
        <div class="mb-3">
          <label for="first_name" class="form-label">First Name:</label>
          <input
              id="first_name"
              v-model="first_name"
              type="text"
              class="form-control"
              placeholder="Enter first name"
              required
          >
        </div>

        <div class="mb-3">
          <label for="last_name" class="form-label">Last Name:</label>
          <input
              id="last_name"
              v-model="last_name"
              type="text"
              class="form-control"
              placeholder="Enter last name"
              required
          >
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
              id="email"
              v-model="email"
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
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter password"
              required
          >
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Repeat Password:</label>
          <input
              id="repeatPassword"
              v-model="repeatPassword"
              type="password"
              class="form-control"
              placeholder="Repeat password"
              required
          >
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender:</label>
          <select
              id="gender"
              v-model="gender"
              class="form-control"
              required
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>


        <button type="submit" class="btn btn-primary" @click="signup">
          <i class="fa-solid fa-right-to-bracket"></i> Create an account
        </button>
        <RouterLink to="/signup" class="btn btn-link">
          <button type="button" class="btn btn-secondary"><i class="fa-solid fa-right-to-bracket"></i> I already have an account</button>
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>