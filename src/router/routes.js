const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
  },

  {
    path: "/tabs",
    component: () => import("layouts/TabLayout.vue"),
    children: [
      { path: "/settings", component: () => import("pages/Settings.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
