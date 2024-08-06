<template>
	<section id="main">
	  <div class="container">
		<h2>{{ pageTitle }}</h2>
		<form @submit.prevent="handleSubmit">
		  <div class="row gtr-50">
			<div class="col-6 col-12-small">
			  <input v-model="firstName" name="Prénom" placeholder="Prénom Author" type="text" />
			</div>
			<div class="col-6 col-12-small">
			  <input v-model="lastName" name="Nom" placeholder="Nom Author" type="text" />
			</div>
			<div class="col-6 col-12-small">
			  <input v-model="title" name="titre" placeholder="Titre Livre" type="text" />
			</div>
			<div class="col-6 col-12-small">
			  <select v-model="genre" name="genre">
				<option value="">--Please choose a genre--</option>
				<option value="Science Fiction">Science Fiction</option>
				<option value="Policier">Policier</option>
				<option value="Historique">Historique</option>
			  </select>
			</div>
			<div class="col-6 col-12-small">
			  <input v-model="coverUrl" name="coverUrl" placeholder="Cover URL" type="text" />
			</div>
			<div class="col-12">
			  <button type="submit" class="form-button-submit button icon solid fa-pen">{{ btnLabel }}</button>
			</div>
		  </div>
		</form>
	  </div>
	</section>
  </template>
  
  <script setup>
  import { ref, computed, onBeforeMount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useBookStore } from '@/stores/books.js'
  
  const route = useRoute()
  const router = useRouter()
  const bookStore = useBookStore()
  const { createNewBook, updateBook, fetchOneBook } = bookStore
  
  const onEditMode = ref(false)
  const bookId = ref(null)
  
  const title = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const coverUrl = ref('')
  const genre = ref('Policier')
  
  const pageTitle = computed(() => (onEditMode.value ? 'ÉDITION' : 'CRÉATION'))
  const btnLabel = computed(() => (onEditMode.value ? 'Update' : 'Create'))
  
  const handleSubmit = async () => {
	const body = {
	  title: title.value,
	  author: {
		firstName: firstName.value,
		lastName: lastName.value
	  },
	  coverUri: coverUrl.value,
	  genre: genre.value
	}
  
	try {
	  if (onEditMode.value) {
		await updateBook({ id: bookId.value, body })
	  } else {
		await createNewBook(body)
	  }
	  // Redirection vers la liste des livres après la mise à jour ou la création
	  router.push({ name: 'books-list' })
	} catch (error) {
	  console.error('Error occurred while saving the book:', error)
	}
  }
  
  const initRefs = async () => {
	if (bookId.value) {
	  const thisBook = await fetchOneBook(bookId.value)
	  title.value = thisBook.title
	  firstName.value = thisBook.author.firstName
	  lastName.value = thisBook.author.lastName
	  coverUrl.value = thisBook.coverUri
	  genre.value = thisBook.genre
	}
  }
  
  onBeforeMount(async () => {
	const { params } = route
	if (params.bookId === 'new') {
	  onEditMode.value = false
	} else {
	  bookId.value = params.bookId
	  onEditMode.value = true
	  await initRefs()
	}
  })
  </script>
  
  <style>
  /* Ajoute tes styles ici si nécessaire */
  </style>
  