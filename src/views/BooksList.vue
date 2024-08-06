<!-- src/views/BookList.vue -->
<template>
  <section id="main">
    <div class="container">
      <!-- Content -->
      <article class="box post">
        <header>
          <h2>Liste des Livres</h2>
          <!-- Le bouton pour ajouter un livre n'est plus nécessaire ici, car il est intégré dans BookActions.vue -->
        </header>
        <!-- Utiliser le composant BookActions ici -->
        <BookActions />
      </article>
    </div>
  </section>
</template>

<script setup>
import BookActions from '@/components/BookActions.vue'
</script>

<style>
/* Ajoute des styles spécifiques à cette vue si nécessaire */
</style>
