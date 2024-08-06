import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksList from '../views/BooksList.vue'
import CreateUpdateBooks from '../views/CreateUpdateBooks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books-list',
      component: BooksList
    },
    {
      path: '/books/:bookId',
      name: 'books-create-update',
      component: CreateUpdateBooks
    }
  ]
})

export default router
