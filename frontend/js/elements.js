let main,
  table,
  dashboardButton,
  customersButton,
  salesButton,
  editButton,
  deleteButton,
  spinner,
  defaultMessage;

const assignElements = () => {
  main = document.querySelector(".main");
  table = document.querySelector(".component__table");
  dashboardButton = document.querySelector(".menu__item--dashboard");
  customersButton = document.querySelector(".menu__item--customers");
  salesButton = document.querySelector(".menu__item--sales");
  editButton = document.querySelector(".table__button--edit");
  deleteButton = document.querySelector(".table__button--delete");
  spinner = document.querySelector(".spinner__picture");
  defaultMessage = document.querySelector(".default-message");
};

assignElements();

const mutationObserver = new MutationObserver(assignElements);

mutationObserver.observe(main, { childList: true });

export {
  main,
  table,
  dashboardButton,
  customersButton,
  salesButton,
  editButton,
  deleteButton,
  spinner,
  defaultMessage,
};
