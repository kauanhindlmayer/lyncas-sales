import message from "@/common/utils/message";

export default async function checkAuth(next, unsavedFlag) {
  if (!unsavedFlag) {
    next();
  } else {
    const answer = await message.confirm(
      "Você tem alterações não salvas. deseja realmente sair?"
    );

    next(answer.isConfirmed);
  }
}
