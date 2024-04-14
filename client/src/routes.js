import { lazy } from "react";
import Home from "./pages/Home";

const SavedRecipes = lazy(() => import("./pages/SavedRecipes"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const appRoutes = [
  {
    path: "/",
    component: Home,
    requiresAuth: false,
  },
  {
    path: "/auth/login",
    component: Login,
    requiresAuth: false,
  },
  {
    path: "/auth/signup",
    component: Signup,
    requiresAuth: false,
  },
  {
    path: "/create-recipe",
    component: CreateRecipe,
    requiresAuth: true,
  },
  {
    path: "/saved-recipes",
    component: SavedRecipes,
    requiresAuth: true,
  },
  {
    path: "*",
    component: NotFound,
    requiresAuth: false,
  },
];
