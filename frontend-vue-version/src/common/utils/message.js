import Swal from "sweetalert2";

const success = (text) => {
  return Swal.fire({
    title: "Sucesso",
    text: text ?? "Registrado com Sucesso!",
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const error = (text) => {
  return Swal.fire({
    title: "Erro",
    text: text ?? "Ocorreu um erro inesperado!",
    icon: "error",
    confirmButtonText: "Ok",
  });
};

const alert = (text) => {
  return Swal.fire({
    title: "Aviso",
    text: text ?? "Registrado com Sucesso!",
    icon: "warning",
    confirmButtonText: "Ok",
  });
};

const confirm = async (html) => {
  return await Swal.fire({
    title: "Confirmar",
    html: html ?? "Tem certeza que deseja executar esta ação?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  });
};

export default {
  success,
  error,
  alert,
  confirm,
};
