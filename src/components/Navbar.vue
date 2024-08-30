<template>
    <nav class="navbar fixed-top">
        <div class="container-fluid">
            <router-link class="text-white" :to="{ name: 'home' }">
                <img class="logo me-2" src="/public/diary.png" alt="logo TravelApp">
                <h3 class="m-0 d-inline-block align-middle"> TravelApp </h3>
            </router-link>

            <button class="btn btn-outline-light d-flex align-items-center " type="button" data-bs-toggle="offcanvas"
                data-bs-target="#sidebarmenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 432 384">
                    <path fill="currentColor" d="M0 336v-48h432v48H0zm0-120v-48h432v48H0zM0 48h432v48H0V48z" />
                </svg>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="sidebarmenu">
                <div class="offcanvas-header">
                    <router-link class="text-white" :to="{ name: 'home' }">
                <h3 class="m-0 d-inline-block align-middle" data-bs-toggle="offcanvas"> Home </h3>
            </router-link>
                    <button type="button" class="btn ms-auto text-white p-0" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item dropdown fs-4" v-for="travel in store.arrayTravel" :key="travel">
                            <router-link class="me-2" :to="{ name: 'travel', query: { title: travel.title } }">
                                <span data-bs-dismiss="offcanvas">{{ travel.title }} </span>
                            </router-link>

                            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                            <ul class="dropdown-menu bg-transparent border-light" >
                                <li v-for="day, index in travel.days" :key="day" data-bs-dismiss="offcanvas">
                                    
                                    <router-link class="dropdown-item" :to="{name: 'travelDay', query: {title: travel.title , day: index+1}}">
                                        <span >{{ day.day }}</span>
                                    </router-link>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { store } from '../store'
export default {
    data() {
        return {
            store
        }
    },
    created() {

    }
}
</script>

<style lang="scss" scoped>
.navbar {
    background-color: #264653;

    .logo {
        max-width: 40px;
    }

    .offcanvas {
        background-color: #264653;

        * {
            color: white;
        }
    }

    .dropdown-item:hover {
        background-color: #F4A261;
    }

}
</style>