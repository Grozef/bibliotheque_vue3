import { ref } from 'vue'
import { defineStore } from 'pinia'
import ky from 'ky'


const API_ENDPOINT = 'http://localhost:3000/'



export const useBookStore = defineStore('books', () => {
  
  const books = ref([])
  const currentBook = ref({})

  const fetchAllBooks = async ()=>{
    const rawRet   = await ky.get(API_ENDPOINT+'books?perPage=40')
    const respJson = await rawRet.json()
    books.value = respJson
    return respJson
  }

  const fetchOneBook = async (bookId)=>{
    const rawRet   = await ky.get(API_ENDPOINT+'books/'+bookId) 
    const respJson = await rawRet.json()
    // books.value = respJson
    return respJson
  }

  const createNewBook = async (body)=>{
    const rawRes   = await ky.post(API_ENDPOINT+'books',{json:body})
    const respJson = await rawRes.json()
    // books.value = respJso
    return respJson
  }

  const updateBook = async ({id,body})=>{
    const rawRes   = await ky.put(API_ENDPOINT+'books/'+id,{json:body})
    const respJson = await rawRes.json()
    // books.value = respJso
    return respJson
  }

  return { 
    fetchAllBooks,
    createNewBook,
    fetchOneBook,
    updateBook,
    books,
    currentBook
  }

})
