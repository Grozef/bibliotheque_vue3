<template>
  <table>
    <thead>
      <tr>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.titre }}</td>
        <td>{{ book.auteur }}</td>
        <td>
          <button @click="editBook(book.id)">Éditer</button>
          <button @click="deleteBook(book.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  books: Array
});

const emit = defineEmits(['edit', 'delete']);

const editBook = (bookId) => {
  emit('edit', bookId);
};

const deleteBook = (bookId) => {
  emit('delete', bookId);
};
</script>

<style scoped>
/* Ajoute des styles spécifiques à ce composant si nécessaire */
</style>
