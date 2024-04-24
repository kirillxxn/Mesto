/* Функция показа ошибок */
const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    validationConfig
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  /*   Функция скрытия ошибок */
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  };
  /*  Функция для проверки наличия невалидного поля */
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  /*   Состояние кнопки переключения */
  const toggleButtonState = (
    inputList,
    buttonElement,
    validationConfig
  ) => {
    if (hasInvalidInput(inputList)) {
      submitButtonDisable(buttonElement, validationConfig);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  /*   Функция проверки валидности полей */
  const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  /*   Слушатель событий ко всем полям формы */
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
  
    toggleButtonState(inputList, buttonElement, validationConfig);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  /*   функция, которая найдёт и переберёт все формы на странице */
  export const enableValidation = (validationConfig) => {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };
  /*   Функция которая очищает ошибки валидации формы и делает кнопку неактивной */
  export function clearValidation(formElement, validationConfig) {
    const inputElements = formElement.querySelectorAll(
      validationConfig.inputSelector
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    inputElements.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
    });
    submitButtonDisable(buttonElement, validationConfig);
  }
  
  const submitButtonDisable = (button, config) => {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  };