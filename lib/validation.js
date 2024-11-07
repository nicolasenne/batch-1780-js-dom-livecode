// TODO: Validate this form

// DOM elements
const allInputs = document.querySelectorAll(".form-control");
const arrayOfAllInputs = Array.from(allInputs);
const emailInput = document.querySelector('#email');
const tosCheckbox = document.querySelector('#tos');
const submitButton = document.querySelector('.btn');

// Mark an input as valid or invalid with the Bootstrap validation classes
const addValidationClasses = (input, isValid) => {
  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
};

// Validate the email format
const emailValidation = (input) => {
  const isValid = /^\w+@\w+(\.\w{2,6})+$/.test(input.value);
  addValidationClasses(input, isValid);
};

// Validate field on blur
const validInput = (input) => {
	if (input === emailInput) {
		emailValidation(input)
	} else {
		addValidationClasses(input, input.value !== "")
	}
}

// All fields are required & must be valid
const allFilled = (inputs) => {
  // Check that the value has been validated
  return inputs.every((input) => {
    return input.classList.contains("is-valid");
  });
};

// Ensure the Terms of Service checkbox is ticked
const checkboxChecked = (input) => {
  return input.checked;
};

// Check if all conditions are reunited to enable the form submit button
const enableButton = () => {
  const allInputsAreFilled = allFilled(arrayOfAllInputs);
  const tosIsValid = checkboxChecked(tosCheckbox);

  if (allInputsAreFilled && tosIsValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

// Events
allInputs.forEach((input) => {
  input.addEventListener("blur", () => {
  	validInput(input);
  	enableButton();
  });
});
tosCheckbox.addEventListener('change', enableButton);
