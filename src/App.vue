<script setup lang="ts">
import {AuthService} from "@/services/auth.service.ts";
import {useLogout} from "@/hooks/logout.hook.ts";
import {useRoute} from "vue-router";

const year = new Date().getFullYear()

const logout = useLogout()

const route = useRoute()
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">Praktikum 2026</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/"><i class="fa-solid fa-house"></i>Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cinemas"><i class="fa-solid fa-building"></i>Cinemas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cart" v-if="AuthService.hasAuth()"><i class="fa-solid fa-basket-shopping"></i>Cart</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about"><i class="fa-solid fa-circle-info"></i>About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/timetable/add"><i class="fa-solid fa-clock"></i>Add Timetable</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login" v-if="!AuthService.hasAuth()"><i class="fa-solid fa-right-to-bracket"></i>Login</RouterLink>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="logout" v-if="AuthService.hasAuth()"><i class="fa-solid fa-skull"></i>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <RouterView :key="route.fullPath"/>
    <footer class="text-center">
      &copy; {{ year }} Goran Suvacarev
    </footer>
  </div>
</template>

<style scoped>
</style>
