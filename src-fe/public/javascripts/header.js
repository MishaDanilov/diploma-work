const nameAndSurname = document.querySelector("#navbarDarkDropdownMenuLink");
const SERVER_ADDRESS = "http://localhost:8080";

async function getUser() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
  let response = await fetch(`${SERVER_ADDRESS}/api/employee/getEmployee`, {
    method: "GET",
    headers: {
      Token: JSON.parse(localStorage.getItem("constr-comp")).token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let user = await response.json();
  return user;
}
async function printHeader() {
  spinnerHead.classList.toggle("indisplay");
  let user = await getUser();
  spinnerHead.classList.toggle("indisplay");
  nameAndSurname.append(user.name + " " + user.surname);
}
printHeader();

function LogOut(params) {
  localStorage.removeItem("constr-comp");
  window.location.href = "/";
}
