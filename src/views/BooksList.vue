<!-- src/views/BookList.vue -->
<template>
  <section id="main">
    <div class="container">
      <!-- Content -->
      <article class="box post">
        <header>
          <h2>Liste des Livres</h2>

        </header>

        <BookActions />
      </article>
    </div>
  </section>
</template>

<script setup>
import BookActions from '@/components/BookActions.vue'
</script>

<style>

</style>
