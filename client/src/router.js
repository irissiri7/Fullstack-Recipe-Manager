import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import MyRecipes from './pages/MyRecipes.vue'
import MyProfile from './pages/MyProfile.vue'
import NotFound from './pages/NotFound.vue'
import Authentication from './pages/Authentication.vue'
import AddRecipe from './pages/AddRecipe.vue'
import EditRecipe from './pages/EditRecipe.vue'
import RecipeDetail from './pages/RecipeDetail.vue'

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
  to.meta.requiresAuth && !store.getters.isAuth ? next('/') : next()
})

export default router
