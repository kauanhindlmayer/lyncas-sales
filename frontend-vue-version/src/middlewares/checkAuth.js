export default function checkAuth(to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("lyncas-sales-token")) {
      next("/conectar-se");
    } else {
      next();
    }
  } else {
    next();
  }
}
