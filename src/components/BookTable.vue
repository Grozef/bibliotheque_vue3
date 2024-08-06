<!-- src/views/BookList.vue -->
<template>
    <section id="main">
      <div class="container">
        <header>
          <h2>Liste des Livres</h2>
          <button @click="handleCreateButton" class="mt-4 icon solid fas fa-book-medical">ADD</button>
        </header>
        <BookTable :books="books" @edit="handleEdit" @delete="handleDelete" />
      </div>
    </section>
  </template>
  
  <script setup>
  import { onBeforeMount } from 'vue'
  import { useBookStore } from '@/stores/books.js'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import BookTable from '@/components/BookTable.vue'
  
  const router = useRouter()
  const bookStore = useBookStore()
  const { fetchAllBooks } = bookStore
  const { books } = storeToRefs(bookStore)
  
  const handleCreateButton = () => {
    router.push({ name: 'booksCreateUpdate', params: { bookId: 'new' } })
  }
  
  const handleEdit = (bookId) => {
    router.push({ name: 'booksCreateUpdate', params: { bookId } })
  }
  
  const handleDelete = async (bookId) => {
    // Ajoute la logique pour supprimer un livre ici
  }
  
  onBeforeMount(async () => {
    await fetchAllBooks()
  })
  </script>
  