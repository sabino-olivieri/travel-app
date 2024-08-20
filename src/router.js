import {createRouter, createWebHistory} from "vue-router";
import HomePage from './pages/HomePage.vue';
import NewTravelPage from "./pages/NewTravelPage.vue";
import TravelPage from "./pages/TravelPage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",    
            name: "home",    
            component: HomePage 
        },
        {
            path: "/new-travel",    
            name: "newTravel",    
            component: NewTravelPage
        },
        {
            path: "/travel/:title",    
            name: "travel",    
            component: TravelPage
        },

    ]
});