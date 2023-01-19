export default function checkAuth(next, unsavedFlag) {
  if (!unsavedFlag) {
    next();
  } else {
    const leave = confirm(
      "Você tem alterações não salvas. Você tem certeza de que quer sair?"
    );
    next(leave);
  }
}
