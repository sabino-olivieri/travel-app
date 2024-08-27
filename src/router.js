import {createRouter, createWebHistory} from "vue-router";
import HomePage from './pages/HomePage.vue';
import NewTravelPage from "./pages/NewTravelPage.vue";
import TravelPage from "./pages/TravelPage.vue";
import DayPage from "./pages/DayPage.vue";
import StagePage from "./pages/StagePage.vue";
import EditTravelPage from "./pages/EditTravelPage.vue";

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
            path: "/travel",    
            name: "travel",    
            component: TravelPage
        },
        {
            path: "/travel/day",    
            name: "travelDay",    
            component: DayPage,
        },
        {
            path: "/travel/day/stage",    
            name: "stagePage",    
            component: StagePage,
        },
        {
            path: "/edit/:id",    
            name: "editTravel",    
            component: EditTravelPage
        }

    ]
});