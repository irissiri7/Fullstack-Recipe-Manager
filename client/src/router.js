import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import MyRecipes from "./pages/MyRecipes.vue";
import MyProfile from "./pages/MyProfile.vue";
import NotFound from "./pages/NotFound.vue";
import LogIn from "./pages/LogIn.vue";
import AddRecipe from "./pages/AddRecipe.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LogIn },
    { path: "/home", component: Home },
    { path: "/my-recipes", component: MyRecipes },
    { path: "/my-recipes/add-recipe", component: AddRecipe },
    { path: "/my-profile", component: MyProfile },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
