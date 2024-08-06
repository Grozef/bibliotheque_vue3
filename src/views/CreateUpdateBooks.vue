<script setup>
import {ref,onBeforeMount,computed} from 'vue'
import {useRoute} from 'vue-router'
import {useBookStore} from '@/stores/books.js'
import { storeToRefs } from 'pinia'

const route = useRoute()
const bookStore = useBookStore()
const {
	createNewBook,
	updateBook,
	fetchOneBook
} = bookStore

const onEditMode = ref(false)
const bookId = ref(null)

const title = ref('')
const firstName = ref('')
const lastName = ref('')
const coverUrl = ref('')
const genre = ref('Policier')

const pageTitle = computed(()=>{
	return onEditMode.value?'EDITION':'CREATION'
})
const btnLabel = computed(()=>{
	return onEditMode.value?'update':'create'
})


const handleCreateUpdateBtn = async ()=>{

	// create
	if(onEditMode.value){
		const tryToUpdate = await updateOneBook()
	}else{
		// POST 
		try {
			const tryToCreate = await createNewBooks()	
			console.log(tryToCreate)
		} catch (error) {
			console.error(error)
		}
		
	}

}

const createNewBooks = async ()=>{
	// je dois faire un POST avec un json DANS LE BODY
	const bodyToSend = {
		title:title.value,
		author:{
			firstName:firstName.value,
			lastName:lastName.value 
		},
		coverUri:coverUrl.value,
		genre:genre.value
	} 
	const tryToCreate = await createNewBook(bodyToSend)
	console.log(tryToCreate)

}

const updateOneBook = async ()=>{
	const bodyToSend = {
		title:title.value,
		author:{
			firstName:firstName.value,
			lastName:lastName.value 
		},
		coverUri:coverUrl.value,
		genre:genre.value
	} 
	const tryToUpdate = await updateBook({id:bookId.value,body:bodyToSend})
	return tryToUpdate
}

const initRefs = async ()=>{

	// fetch le book selectionné 
	const thisBook = await fetchOneBook(bookId.value)
	title.value = thisBook.title 
	firstName.value = thisBook.author.firstName
	lastName.value = thisBook.author.lastName
	genre.value = thisBook.genre
	coverUrl.value = thisBook.coverUri
	// synchro mes refs avec les valeurs d'init 

}



onBeforeMount(async ()=>{
	const {params} = route 
	if(params.bookId==='new'){
		onEditMode.value = false
	}else{
		bookId.value = params.bookId
		onEditMode.value = true
	}

	await initRefs()

})


</script>

<template>
  <section id="main">
		<div class="container">
		<!-- Content -->
			<h2>{{ pageTitle }}</h2>

			<form>
				<div class="row gtr-50">
					<div class="col-6 col-12-small">
						<input v-model="firstName" name="Prénom" placeholder="Prénom Author" type="text" >
					</div>
					<div class="col-6 col-12-small">
						<input v-model="lastName" name="Nom" placeholder="Nom Author" type="text" >
					</div>
					<div class="col-6 col-12-small">
						<input v-model="title" name="titre" placeholder="Titre Livre" type="text">
					</div>
					<div class="col-6 col-12-small">
						<select v-model='genre' name="genre" >
							<option value="">--Please choose a genre--</option>
							<option value="Science Fiction">Science Fiction</option>
							<option value="Policier">Policier</option>
							<option value="Historique">Historique</option>
						</select>
					</div>	
					<div class="col-6 col-12-small">
						<input v-model="coverUrl" name="titre" placeholder="cover Url" type="text">
					</div>
					<div class="col-12">
						<button @click="handleCreateUpdateBtn" type="button" class="form-button-submit button icon solid fa-pen">{{btnLabel}}</button>
					</div>
				</div>
			</form>

		</div>
	</section>
</template>

<style>
</style>
