const loginForm = document.querySelector("#loginForm")
const SERVER_ADDRESS = "http://localhost:8080";

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch(`${SERVER_ADDRESS}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginForm.elements.username.value,
        password: loginForm.elements.password.value,
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