// ===*=== Getting Elements ===*===
let userformEl = document.querySelector("#user-form");
let userInputEl = document.querySelector("#username");
let languagesEl = document.querySelector(".languages");
let serachTermEl = document.querySelector("#search-term");
let reposEl = document.querySelector("#repos");

// ===*=== Events ===*===
userformEl.addEventListener("submit", formSubmitHandler);

// ===*=== Functions ===*===
function formSubmitHandler(e) {
   e.preventDefault();
   let user = userInputEl.value.trim();
   if (user) {
      reposEl.innerHTML = "";
      getUserRepos(user);
   } else {
      alert("Please type a username");
   }
}

function getUserRepos(user) {
   let apiUrl = `https://api.github.com/users/${user}/repos`;
   fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => displayRepos(data, user))
      .catch((err) => alert("Something went wrong!!!"));
}
function displayRepos(repos, searchTerm) {
   serachTermEl.innerHTML = searchTerm;
   repos.forEach((repo) => {
      reposEl.innerHTML += `
        <a href="#" class="repo-item">
        <span>${repo.owner.login} / ${repo.name}</span>
        <span>${
           repo.open_issues_count > 0
              ? '<i class="fas fa-times"></i>'
              : '<i class="fas fa-check-square"></i>'
        }</span>
        </a>`;
   });
}
