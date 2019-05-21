const searchInputForm = document.getElementById('searchForm');

searchInputForm.addEventListener('submit', function(event) {
  event.preventDefault();
});

const searchButtonElement = document.getElementById('searchButton');

searchButtonElement.addEventListener('click', function(event) {
  search();
});

function search() {
  const userName = document.getElementById('searchInput').value;;
  const urlRepos = "https://api.github.com/users/" + userName + "/repos";

  getUser(userName, function(parsedResponse) {
    printUserDetails(parsedResponse);
    searchRepos(urlRepos)
  }, function(error) {
    showError();
    console.log("getUser error");

  });
}

function getUser(userName, success, error) {
  var urlUser="https://api.github.com/users/" + userName;
  var req = new XMLHttpRequest();

  req.open("GET", urlUser, true);
  req.onreadystatechange = function(){
    if (req.readyState === 4) {
      if (req.status === 200) {
          const parsedResponse = JSON.parse(req.response);

          success(parsedResponse);
      }

      if (req.status === 404) {
        console.log('User not found');
        error();
      }
    }
  }

  req.send();
} //getUser

function searchRepos(urlRepos){
var req = new XMLHttpRequest();

req.open("GET", urlRepos, true);
req.onreadystatechange = function(){
  if (req.readyState === 4) {
    if (req.status === 200) {
        const parsedResponse = JSON.parse(req.response);

        console.log(parsedResponse);
        printRepos(parsedResponse);
    }
  }
}
req.send();
} //fin-searchRepos()



function printUserDetails(data) {
   const loginName = data["login"];
   const fullName = data["name"];
   const description = data["bio"];
   const avatarUrl = data["avatar_url"]

   document.querySelector(".loginName").innerText = "@"+loginName;
   document.querySelector(".fullName").innerText = fullName;
   document.querySelector(".description").innerText = description;
   document.querySelector("img").src = avatarUrl;
   document.querySelector("img").alt = loginName;
}

function printRepos(repos) {
  const starImg = '<img src="src/star.svg" alt="star">';
  const forkImg = '<img src="src/fork.svg" alt="forks">';
  const tableElement = document.querySelector("table");

  tableElement.innerHTML = ''; // Clean up the table content.

  for (var i = 0; i < repos.length; i++) {
    console.log(repos[i]["name"]);
    let repoName = repos[i]["name"];
    let stars = repos[i]["stargazers_count"];
    let forks = repos[i]["forks_count"];

    console.log(repoName, stars, forks);

    tableElement.innerHTML += '<tr><th scope="row">' + repoName + '</th><td>' + starImg + ' ' + stars + ' ' + forkImg + ' ' + forks + '</td></tr>';
  }
}

function showError(asd) {
  console.log("show error");
document.getElementById("searchForm").reset()  // cleanForm()
  // Set display visible.
}

function cleanForm() {

}
