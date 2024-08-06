<template>
  <div>
    <!-- Ajouter un Livre -->
    <button @click="navigateToCreate" class="button add-button">Add Book</button>
    
    <!-- Filtrer les Livres -->
    <input v-model="filterText" @input="applyFilter" placeholder="Filter by title..." class="filter-input" />
    
    <!-- Liste des Livres -->
    <div v-if="filteredBooks.length">
      <ul>
        <li v-for="book in filteredBooks" :key="book._id">
          {{ book.title }} - {{ book.author.firstName + ' ' + book.author.lastName }} - {{ book.publicationDate }}
          <button @click="navigateToEdit(book._id)" class="button edit-button">Edit</button>
          <button @click="handleDelete(book._id)" class="button delete-button">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No books available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/books.js'
import { storeToRefs } from 'pinia'

const router = useRouter()
const bookStore = useBookStore()
const { fetchAllBooks, deleteBook } = bookStore
const { books } = storeToRefs(bookStore)

const filterText = ref('')

const filteredBooks = computed(() => {
  return books.value.filter(book => book.title.toLowerCase().includes(filterText.value.toLowerCase()))
})

const navigateToCreate = () => {
  router.push({ name: 'books-create-update', params: { bookId: 'new' } })
}

const navigateToEdit = (bookId) => {
  router.push({ name: 'books-create-update', params: { bookId } })
}

const applyFilter = () => {
  // Le filtrage est déjà géré par la computed property `filteredBooks`
}

const handleDelete = async (bookId) => {
  try {
    await deleteBook(bookId) 
    await fetchAllBooks() // Recharger la liste des livres après suppression
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}

onMounted(async () => {
  await fetchAllBooks()
})
</script>

<style scoped>
.button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
.add-button { background-color: #28a745; color: white; }
.edit-button { background-color: #ffc107; color: white; }
.delete-button { background-color: #dc3545; color: white; }
.filter-input {
  margin: 1rem;
  padding: 0.5rem;
  width: 100%;
}
</style>
