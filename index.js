const resultsDiv = document.querySelector(".results");
const noResultsDiv = document.querySelector(".noResults");
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
});

const searchButtonElement = document.getElementById('searchButton');

searchButtonElement.addEventListener('click', function(event) {
    search();
});

function search() {
    const userName = document.getElementById('searchInput').value;;
    const urlRepos = `https://api.github.com/users/${userName}/repos`;
    if (userName === "") {
        cleanForm();
    } else if (userName != "") {
        getUser(userName, function(userData) {
            printUserDetails(userData);
            searchRepos(urlRepos)
        }, function(error) {
            showError();
        });
    }
}

function getUser(userName, success, error) {
    const urlUser = `https://api.github.com/users/${userName}`;
    const req = new XMLHttpRequest();
    cleanForm();

    req.open("GET", urlUser, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const userData = JSON.parse(req.response);
                success(userData);
            }

            if (req.status === 404) {
                error();
            }
        }
    }

    req.send();
} //getUser


function printUserDetails(data) {
    const loginName = data["login"];
    const fullName = data["name"];
    const description = data["bio"];
    const avatarUrl = data["avatar_url"]
    document.querySelector(".loginName").innerText = `@${loginName}`;
    document.querySelector(".fullName").innerText = fullName;
    document.querySelector(".description").innerText = description;
    document.querySelector("img").src = avatarUrl;
    document.querySelector("img").alt = loginName;
}

function searchRepos(urlRepos) {
    const req = new XMLHttpRequest();

    req.open("GET", urlRepos, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const userRepos = JSON.parse(req.response);

                printRepos(userRepos);
            }
        }
    }
    req.send();
} //fin-searchRepos()


function printRepos(repos) {
    const starImg = '<img src="src/star.svg" alt="star">';
    const forkImg = '<img src="src/fork.svg" alt="forks">';
    const tableElement = document.querySelector("table");

    tableElement.innerHTML = ''; // Clean up the table content.
    resultsDiv.style.display = "block"

    for (let i = 0; i < repos.length; i++) {
        console.log(repos[i]["name"]);
        let repoName = repos[i]["name"];
        let stars = repos[i]["stargazers_count"];
        let forks = repos[i]["forks_count"];

        tableElement.innerHTML +=
        `<tr>
          <th scope="row">${repoName}</th>
          <td>${starImg} ${stars} ${forkImg} ${forks}</td>
        </tr>`;
    }
}

function showError() {
    noResultsDiv.style.display = "block";
}

function cleanForm() {
    resultsDiv.style.display = "none";
    noResultsDiv.style.display = "none";
}
