const email = document.querySelector("#email");
const username = document.querySelector("#username");
const names = document.querySelector("#name");
const surname = document.querySelector("#surname");
const password = document.querySelector("#password");
const next = document.querySelector("#next");
const avatar = document.querySelector("#avatar");
const create = document.querySelector("#create");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");
const stepBackButton = document.querySelector("#stepBackButton");
const registrationForm = document.querySelector("#registrationForm")
const SERVER_ADDRESS = "http://localhost:8080";

let count = 0;
function nextStep() {
  if (count >= 2) return;
  count++;
  if (count == 1) {
    email.classList.toggle("hidden"); //-
    username.classList.toggle("hidden"); //+
    names.classList.toggle("hidden"); //+
    surname.classList.toggle("hidden"); //+
    step1.classList.toggle("active"); //-
    step2.classList.toggle("active"); //+
  }
  if (count == 2) {
    password.classList.toggle("hidden"); //+
    username.classList.toggle("hidden"); //-
    names.classList.toggle("hidden"); //-
    surname.classList.toggle("hidden"); //-
    step2.classList.toggle("active"); //-
    step3.classList.toggle("active"); //+
    next.classList.toggle("hidden");
    create.classList.toggle("hidden");
  }
}
function stepBack() {
  if (count <= 0) return;
  count--;
  if (count == 0) {
    email.classList.toggle("hidden");
    username.classList.toggle("hidden");
    names.classList.toggle("hidden");
    surname.classList.toggle("hidden");
    step1.classList.toggle("active");
    step2.classList.toggle("active");
  }
  if (count == 1) {
    password.classList.toggle("hidden");
    username.classList.toggle("hidden");
    names.classList.toggle("hidden");
    surname.classList.toggle("hidden");
    step2.classList.toggle("active");
    step3.classList.toggle("active");
    next.classList.toggle("hidden");
    create.classList.toggle("hidden");
  }
}

registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch(`${SERVER_ADDRESS}/api/registration`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: registrationForm.elements.email.value,
      username: registrationForm.elements.username.value,
      name: registrationForm.elements.name.value,
      surname: registrationForm.elements.surname.value,
      password: registrationForm.elements.password.value,
    }),
  });
  if (response.ok) {
    const result = await response.json();
    const { token, employeeId } = result.result;
    localStorage.setItem("constr-comp", JSON.stringify({ employeeId, token }));

    const resultFetch = await fetch(`${SERVER_ADDRESS}/api/dummy`, {
      method: "POST",
      headers: {
        Token: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        employeeId,
        redirect: "/home",
      }),
    });
    if (resultFetch.ok) {
      const resultFetchJson = await resultFetch.json();
      if(resultFetchJson.result = token) {
        window.location.href = "/home";
      }
    }
  } else {
    const result = await response.json();
    console.log(result);
    alert(result.statusMessage);
  }
});
