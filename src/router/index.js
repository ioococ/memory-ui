import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/view/page/home.vue'),
    children: [
      { path: "/", name: "index", component: () => import('@/view/page/index.vue') },
      { path: "/sort", name: "sort", component: () => import('@/view/page/sort.vue') },
      { path: "/article", name: "article", component: () => import('@/view/page/article.vue') },
      { path: "/diary", name: "diary", component: () => import('@/view/page/diary.vue') },
      { path: "/weiYan", name: "weiYan", component: () => import('@/view/page/weiYan.vue') },
      { path: "/travel", name: "travel", component: () => import('@/view/page/travel.vue') },
      { path: "/message", name: "message", component: () => import('@/view/page/message.vue') },
      { path: "/about", name: "about", component: () => import('@/view/page/about.vue') },
      { path: "/user", name: "user", component: () => import('@/view/page/user.vue') }
    ]
  },
  { path: '/admin', redirect: '/welcome', meta: {requiresAuth: true}, component: () => import('@/view/admin/admin.vue'),
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/view/admin/welcome.vue') },
      { path: '/main', name: 'main', component: () => import('@/view/admin/main.vue') },
      { path: '/webEdit', name: 'webEdit', component: () => import('@/view/admin/webEdit.vue') },
      { path: '/userList', name: 'userList', component: () => import('@/view/admin/userList.vue') },
      { path: '/postList', name: 'postList', component: () => import('@/view/admin/postList.vue') },
      { path: '/postEdit', name: 'postEdit', component: () => import('@/view/admin/postEdit.vue') },
      { path: '/sortList', name: 'sortList', component: () => import('@/view/admin/sortList.vue') },
      { path: '/commentList', name: 'commentList', component: () => import('@/view/admin/commentList.vue') },
      { path: '/treeHoleList', name: 'treeHoleList', component: () => import('@/view/admin/treeHoleList.vue') },
      { path: '/resourceList', name: 'resourceList', component: () => import('@/view/admin/resourceList.vue') },
      { path: '/loveList', name: 'loveList', component: () => import('@/view/admin/loveList.vue') },
      { path: '/resourcePathList', name: 'resourcePathList', component: () => import('@/view/admin/resourcePathList.vue')
    }]
  },
  { path: '/verify', name: 'verify', component: () => import('@/view/admin/verify.vue') }
]

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Boolean(localStorage.getItem("adminToken"))) {
      next({path: '/verify', query: {redirect: to.fullPath}});
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
