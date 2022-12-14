// ===*=== Getting Elements ===*===
let userformEl = document.querySelector("#user-form");
let userInputEl = document.querySelector("#username");
let languagesEl = document.querySelector(".languages");
let serachTermEl = document.querySelector("#search-term");
let reposEl = document.querySelector("#repos");

// ===*=== Events ===*===
userformEl.addEventListener("submit", formSubmitHandler);
languagesEl.addEventListener("click", handleClick);

// ===*=== Functions ===*===
// ==*== Handle Language Click ==*==
function handleClick(e) {
   let lng = e.target.getAttribute("data-lng");
   if (lng) {
      reposEl.innerHTML = "";
      getLngRepos(lng);
   }
}

// ==*== Fetching Language from Api==*==
function getLngRepos(lng) {
   let apiUrl = `https://api.github.com/search/repositories?q=${lng}`;
   fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => displayRepos(data.items, lng))
      .catch((err) => alert("Something went wrong!!!"));
}

// ==*== Handle User Click ==*==
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

// ==*== Fetching User Repos from Api==*==
function getUserRepos(user) {
   let apiUrl = `https://api.github.com/users/${user}/repos`;
   fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => displayRepos(data, user))
      .catch((err) => alert("Something went wrong!!!"));
}

// ==*== Display Repos==*==
function displayRepos(repos, searchTerm) {
   if (repos.length == 0) {
      reposEl.innerHTML = "No Repos...!";
      return;
   }
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
