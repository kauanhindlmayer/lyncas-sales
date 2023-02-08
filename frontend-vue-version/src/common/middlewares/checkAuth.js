import jwtService from "@/common/services/jwt.service";

export default function checkAuth(to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!jwtService.getToken()) {
      next("/conectar-se");
    } else {
      next();
    }
  } else {
    next();
  }
}
