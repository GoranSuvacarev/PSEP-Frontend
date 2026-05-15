<script setup lang="ts">
import { ref } from 'vue'
import {DataService} from "@/services/data.service.ts";
import router from "@/router";

const code = ref<number>()
const email = sessionStorage.getItem('verifyEmail')

function verify() {
  if (code.value === 0)
    alert('Please enter verification code')
  DataService.veifyEmiail(code.value).then(rsp => router.push('/login'))
}

</script>

<template>
  <div class="card crud-container">
    <div class="card-header fw-bold">
      Email Verification
    </div>

    <div class="card-body">
      <div class="alert alert-warning" role="alert">
        The verification code has been sent to {{ email ?? 'your email' }} address!
      </div>
      <form @submit.prevent="verify" novalidate>
        <div class="mb-3">
          <label for="code" class="form-label"></label>
          <input
              id="code"
              v-model="code"
              type="number"
              class="form-control"
              placeholder="Enter verification code"
              required
          >
        </div>
        <button type="submit" class="btn btn-primary" @click="verify">
          <i class="fa-solid fa-right-to-bracket"></i> Verify
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>