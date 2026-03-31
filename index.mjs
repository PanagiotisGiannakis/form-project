const addressForm = document.forms.addressForm;
const { age, conversion, framework, frameworkBox, name, terms } = addressForm;

const generateValues = () => ({
  age: age.value,
  conversion: conversion.value,
  framework: Array.from(framework).find((option) => option.checked)?.value,
  name: name.value,
  terms: terms.checked
});

const validateForm = (values) => {
  const errors = {};

  if (values.name.length < 6) {
    name.classList.add("error-input");
    errors.nameError = "Your name should be more then 6 characters";
  }
  if (values.name.length >= 6) {
    name.classList.remove("error-input");
    errors.nameError = "";
  }

  if (!values.age) {
    age.classList.add("error-input");
    errors.ageError = "Please fill in the field";
  }
  if (Number(values.age) < 18) {
    age.classList.add("error-input");
    errors.ageError = "Your should be more then 18";
  }
  if (Number(values.age) >= 18) {
    age.classList.remove("error-input");
    errors.ageError = "";
  }

  if (!values.framework) {
    frameworkBox.classList.add("error-input");
    errors.frameworkError = "Please fill in the field";
  }
  if (values.framework) {
    frameworkBox.classList.remove("error-input");
    errors.frameworkError = "";
  }

  if (!conversion.value) {
    conversion.classList.add("error-input");

    errors.conversionError = "Please select a conversion";
  }
  if (conversion.value) {
    conversion.classList.remove("error-input");
    errors.conversionError = "";
  }

  if (!values.terms) {
    errors.termsError = "Please accept terms and conditions";
  }
  if (values.terms) {
    errors.termsError = "";
  }

  Object.entries(errors).forEach(([key, value]) => {
    document.getElementById(key).textContent = value;
  });

  return !Object.values(errors).filter((error) => error).length;
};

const saveInfromation = (values) =>
  fetch("https://jsonplaceholder.typicode.com/posts", {
    body: JSON.stringify(values),
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

addressForm.onsubmit = (event) => {
  event.preventDefault();
  const values = generateValues();

  if (validateForm(values)) {
    saveInfromation(values);
    addressForm.reset();
  }
};
