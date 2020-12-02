import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import MyRecipes from './pages/MyRecipes.vue'
import MyProfile from './pages/MyProfile.vue'
import NotFound from './pages/NotFound.vue'
import SignIn from './pages/SignIn.vue'
import AddRecipe from './pages/AddRecipe.vue'
import EditRecipe from './pages/EditRecipe.vue'
import RecipeDetail from './pages/RecipeDetail.vue'
import SignUp from './pages/SignUp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SignIn },
    { path: '/sign-up', component: SignUp },
    { path: '/home', component: Home },
    { path: '/my-recipes', component: MyRecipes },
    { path: '/my-recipes/add-recipe', component: AddRecipe },
    { path: '/my-recipes/edit-recipe/:id', component: EditRecipe },
    { path: '/my-recipes/recipe-id', component: RecipeDetail },
    { path: '/my-profile', component: MyProfile },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
