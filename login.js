const username = document.querySelector(".username");
const password = document.querySelector(".password");
const login = document.querySelector(".login");

login.addEventListener("click", () => {
  if (username.value === "admin" && password.value === "admin") {
    window.location.href = "/Library management system/main.html";
  } else {
    const para1 = document.querySelector(".para1");
    para1.innerHTML = `Try again`;
    para1.style.color = "red";
    setTimeout(() => {
      para1.innerHTML = "`";
      para1.style.color = "white";
    }, 2000);
  }
});
