import { createRouter, createWebHistory } from 'vue-router'

//Always load
import Home from './pages/Home.vue'
import MyRecipes from './pages/MyRecipes.vue'
import AddRecipe from './pages/AddRecipe.vue'
import EditRecipe from './pages/EditRecipe.vue'
import RecipeDetail from './pages/RecipeDetail.vue'

//Load when needed
const Authentication = () => import('./pages/Authentication.vue')
const AutoSignedOut = () => import('./pages/AutoSignedOut.vue')
const NotFound = () => import('./pages/NotFound.vue')
const MyProfile = () => import('./pages/MyProfile.vue')

import store from './store.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Authentication },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/my-recipes', component: MyRecipes, meta: { requiresAuth: true } },
    {
      path: '/my-recipes/add-recipe',
      component: AddRecipe,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-recipes/edit-recipe/:id',
      component: EditRecipe,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-recipes/:id',
      component: RecipeDetail,
      meta: { requiresAuth: true }
    },
    { path: '/my-profile', component: MyProfile, meta: { requiresAuth: true } },
    { path: '/auto-signed-out', component: AutoSignedOut },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({ ...savedPosition, behavior: 'smooth' })
        } else {
          resolve({ left: 0, top: 0, behavior: 'smooth' })
        }
      }, 1000)
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && store.getters.isAuth) {
    return next('/home')
  }
  to.meta.requiresAuth && !store.getters.isAuth ? next('/') : next()
})

export default router
