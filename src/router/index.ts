import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import {auth} from '@/firebase';
import {onAuthStateChanged} from 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        component: AuthLayout
    },
    {
        path: '/',
        redirect: '/main/Documents'
    },
    {
        path: '/main',
        component: MainLayout,
        children: [
            {
                path: '',
                redirect: '/main/Documents'
            },
            {
                path: '/main/Documents',
                component: () => import('@/views/DocumentsPage.vue')
            },
            {
                path: '/main/Answer',
                component: () => import('@/views/AnswerPage.vue')
            },
            {
                path: '/main/Bookmarks',
                component: () => import('@/views/BookmarksPage.vue')
            },
            {
                path: '/main/Profile',
                component: () => import('@/views/ProfilePage.vue')
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// ✅ Navigation Guard
let isInitialized = false;
router.beforeEach((to, from, next) => {
    // Инициализировать только 1 раз
    if (!isInitialized) {
        onAuthStateChanged(auth, (user) => {
            if (!user && to.path.startsWith('/main')) {
                // Если не авторизован и пытается попасть в main
                next('/auth');
            } else {
                next();
            }
        });
        isInitialized = true;
    } else {
        // Если уже инициализирован, просто разрешаем переход
        next();
    }
});

export default router;
