import Swal from "sweetalert2";
import i18n from "@/i18n/i18n";

const success = (text) => {
  return Swal.fire({
    title: i18n.global.t("GENERAL.SUCCESS"),
    text: text ?? i18n.global.t("GENERAL.SUCCESSFULLY_REGISTERED"),
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const error = (text) => {
  return Swal.fire({
    title: i18n.global.t("GENERAL.ERROR"),
    text: text ?? i18n.global.t("GENERAL.UNEXPECTED_ERROR"),
    icon: "error",
    confirmButtonText: "Ok",
  });
};

const alert = (text) => {
  return Swal.fire({
    title: i18n.global.t("GENERAL.WARNING"),
    text: text ?? i18n.global.t("GENERAL.SUCCESSFULLY_REGISTERED"),
    icon: "warning",
    confirmButtonText: "Ok",
  });
};

const confirm = async (html) => {
  return await Swal.fire({
    title: i18n.global.t("GENERAL.CONFIRM"),
    html: html ?? i18n.global.t("GENERAL.CONFIRM_ACTION"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: i18n.global.t("GENERAL.YES"),
    cancelButtonText: i18n.global.t("GENERAL.NO"),
  });
};

export default {
  success,
  error,
  alert,
  confirm,
};
