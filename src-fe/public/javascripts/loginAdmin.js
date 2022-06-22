const loginAdminForm = document.querySelector("#loginAdminForm")
const SERVER_ADDRESS = "http://localhost:8080";

loginAdminForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch(`${SERVER_ADDRESS}/api/login/admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginAdminForm.elements.username.value,
        password: loginAdminForm.elements.password.value,
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
          redirect: "/admin/panel",
        }),
      });
      if (resultFetch.ok) {
        const resultFetchJson = await resultFetch.json();
        if(resultFetchJson.result = token) {
          window.location.href = "/admin/panel";
        }
      }
    } else {
      const result = await response.json();
      console.log(result);
      alert(result.statusMessage);
    }
  });