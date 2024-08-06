<!-- src/components/BookForm.vue -->
<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title</label>
        <input v-model="form.title" id="title" type="text" required />
      </div>
      <div>
        <label for="firstName">Author First Name</label>
        <input v-model="form.firstName" id="firstName" type="text" required />
      </div>
      <div>
        <label for="lastName">Author Last Name</label>
        <input v-model="form.lastName" id="lastName" type="text" required />
      </div>
      <div>
        <label for="coverUrl">Cover URL</label>
        <input v-model="form.coverUrl" id="coverUrl" type="text" required />
      </div>
      <div>
        <label for="genre">Genre</label>
        <select v-model="form.genre" id="genre">
          <option value="Science Fiction">Science Fiction</option>
          <option value="Policier">Policier</option>
          <option value="Historique">Historique</option>
        </select>
      </div>
      <button type="submit">{{ buttonLabel }}</button>
    </form>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBookStore } from '@/stores/books.js'
  
  const route = useRoute()
  const bookStore = useBookStore()
  const { createNewBook, updateBook, fetchOneBook } = bookStore
  
  const form = ref({
    title: '',
    firstName: '',
    lastName: '',
    coverUrl: '',
    genre: 'Policier'
  })
  
  const buttonLabel = computed(() => (route.params.bookId === 'new' ? 'Create' : 'Update'))
  
  const handleSubmit = async () => {
    const bookId = route.params.bookId
    const body = {
      title: form.value.title,
      author: {
        firstName: form.value.firstName,
        lastName: form.value.lastName
      },
      coverUri: form.value.coverUrl,
      genre: form.value.genre
    }
  
    if (bookId === 'new') {
      await createNewBook(body)
    } else {
      await updateBook({ id: bookId, body })
    }
  }
  
  onMounted(async () => {
    const bookId = route.params.bookId
    if (bookId !== 'new') {
      const book = await fetchOneBook(bookId)
      form.value = {
        title: book.title,
        firstName: book.author.firstName,
        lastName: book.author.lastName,
        coverUrl: book.coverUri,
        genre: book.genre
      }
    }
  })
  </script>
  
  <style scoped>
  /* Ajoute tes styles ici */
  </style>
  