import message from "@/common/utils/message";
import i18n from "@/i18n/i18n";

export default async function checkAuth(next, unsavedFlag) {
  if (!unsavedFlag) {
    next();
  } else {
    const answer = await message.confirm(
      i18n.global.t("GENERAL.CHECK_UNSAVED")
    );

    next(answer.isConfirmed);
  }
}
