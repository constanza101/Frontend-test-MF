const GITHUB_USERS = "https://api.github.com/users/";
const resultsDiv = document.querySelector(".results");
const noResultsDiv = document.querySelector(".no-results");
const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
});

/**
 * Takes the value of the form input = login name of a Github user
 */

const searchButtonElement = document.getElementById('searchButton');
searchButtonElement.addEventListener('click', function(event) {
    search();
});


/**
 * Takes the value of the form input = login name of a Github user
 */

function search() {
    const userName = document.getElementById('searchInput').value;;
    const urlRepos = `${GITHUB_USERS}${userName}/repos`;
    if (userName === "") {
        cleanForm();
    } else if (userName != "") {
        getUser(userName, function(userData) {
            printUserDetails(userData);
            searchRepos(urlRepos);
        }, function(error) {
            showError();
        });
    }
}


/**
 * Searches an user on Github based on user name.
 *
 * @param {string} userName - User name from the input value, to be searched on Github.
 * @param {function} success - Callback when the fetch is successful.
 * @param {function} error - Callback when the fetch fails.
 */

function getUser(userName, success, error) {
    const urlUser = `${GITHUB_USERS}${userName}`;
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
}

/**
 * Prints user's personal info from the users endpoint.
 * @param {object} data - user information.
*/

function printUserDetails(data) {
    const loginName = data["login"];
    const fullName = data["name"];
    const description = data["bio"];
    const avatarUrl = data["avatar_url"];
    document.querySelector(".login-name").innerText = `@${loginName}`;
    document.querySelector(".full-name").innerText = fullName;
    document.querySelector(".description").innerText = description;
    document.querySelector("img").src = avatarUrl;
    document.querySelector("img").alt = loginName;
}

/**
 * searches user's repositories  from the repositories endpoint.
 * @param {string} urlRepos - user's repositories endpoint url.
*/

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
}


/**
 * Prints a list of user's repositories from the repos endpoint - with stars and forks for each repo.
 * @param {object} repos - user information.
*/

function printRepos(repos) {
    const starImg = '<img src="src/star.svg" alt="star">';
    const forkImg = '<img src="src/fork.svg" alt="forks">';
    const tableElement = document.querySelector("table");

    tableElement.innerHTML = ''; // Clean up the table content.
    resultsDiv.style.display = "block";

    for (let i = 0; i < repos.length; i++) {
        console.log(repos[i]["name"]);
        let repoName = repos[i]["name"];
        let stars = repos[i]["stargazers_count"];
        let forks = repos[i]["forks_count"];
        let repoUrl = repos[i]["html_url"]

        tableElement.innerHTML +=
        `<tr>
          <th scope="row">
          <a href="${repoUrl}">${repoName}</a>
          </th>
          <td>${starImg} ${stars} ${forkImg} ${forks}</td>
        </tr>`;
    }
}

/**
  * Displays the "user not found" result.
*/

function showError() {
    noResultsDiv.style.display = "block";
}

/**
  *  hides all previous results.
*/

function cleanForm() {
    resultsDiv.style.display = "none";
    noResultsDiv.style.display = "none";
}


[
  {
    "id": 168818824,
    "node_id": "MDEwOlJlcG9zaXRvcnkxNjg4MTg4MjQ=",
    "name": "bicing-lite",
    "full_name": "constanza101/bicing-lite",
    "private": false,
    "owner": {
      "login": "constanza101",
      "id": 46341139,
      "node_id": "MDQ6VXNlcjQ2MzQxMTM5",
      "avatar_url": "https://avatars2.githubusercontent.com/u/46341139?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/constanza101",
      "html_url": "https://github.com/constanza101",
      "followers_url": "https://api.github.com/users/constanza101/followers",
      "following_url": "https://api.github.com/users/constanza101/following{/other_user}",
      "gists_url": "https://api.github.com/users/constanza101/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/constanza101/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/constanza101/subscriptions",
      "organizations_url": "https://api.github.com/users/constanza101/orgs",
      "repos_url": "https://api.github.com/users/constanza101/repos",
      "events_url": "https://api.github.com/users/constanza101/events{/privacy}",
      "received_events_url": "https://api.github.com/users/constanza101/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/constanza101/bicing-lite",
    "description": "simple website to check shared bikes availability.",
    "fork": false,
    "url": "https://api.github.com/repos/constanza101/bicing-lite",
    "forks_url": "https://api.github.com/repos/constanza101/bicing-lite/forks",
    "keys_url": "https://api.github.com/repos/constanza101/bicing-lite/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/constanza101/bicing-lite/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/constanza101/bicing-lite/teams",
    "hooks_url": "https://api.github.com/repos/constanza101/bicing-lite/hooks",
    "issue_events_url": "https://api.github.com/repos/constanza101/bicing-lite/issues/events{/number}",
    "events_url": "https://api.github.com/repos/constanza101/bicing-lite/events",
    "assignees_url": "https://api.github.com/repos/constanza101/bicing-lite/assignees{/user}",
    "branches_url": "https://api.github.com/repos/constanza101/bicing-lite/branches{/branch}",
    "tags_url": "https://api.github.com/repos/constanza101/bicing-lite/tags",
    "blobs_url": "https://api.github.com/repos/constanza101/bicing-lite/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/constanza101/bicing-lite/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/constanza101/bicing-lite/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/constanza101/bicing-lite/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/constanza101/bicing-lite/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/constanza101/bicing-lite/languages",
    "stargazers_url": "https://api.github.com/repos/constanza101/bicing-lite/stargazers",
    "contributors_url": "https://api.github.com/repos/constanza101/bicing-lite/contributors",
    "subscribers_url": "https://api.github.com/repos/constanza101/bicing-lite/subscribers",
    "subscription_url": "https://api.github.com/repos/constanza101/bicing-lite/subscription",
    "commits_url": "https://api.github.com/repos/constanza101/bicing-lite/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/constanza101/bicing-lite/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/constanza101/bicing-lite/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/constanza101/bicing-lite/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/constanza101/bicing-lite/contents/{+path}",
    "compare_url": "https://api.github.com/repos/constanza101/bicing-lite/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/constanza101/bicing-lite/merges",
    "archive_url": "https://api.github.com/repos/constanza101/bicing-lite/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/constanza101/bicing-lite/downloads",
    "issues_url": "https://api.github.com/repos/constanza101/bicing-lite/issues{/number}",
    "pulls_url": "https://api.github.com/repos/constanza101/bicing-lite/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/constanza101/bicing-lite/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/constanza101/bicing-lite/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/constanza101/bicing-lite/labels{/name}",
    "releases_url": "https://api.github.com/repos/constanza101/bicing-lite/releases{/id}",
    "deployments_url": "https://api.github.com/repos/constanza101/bicing-lite/deployments",
    "created_at": "2019-02-02T10:08:06Z",
    "updated_at": "2019-02-14T08:41:19Z",
    "pushed_at": "2019-02-14T08:41:18Z",
    "git_url": "git://github.com/constanza101/bicing-lite.git",
    "ssh_url": "git@github.com:constanza101/bicing-lite.git",
    "clone_url": "https://github.com/constanza101/bicing-lite.git",
    "svn_url": "https://github.com/constanza101/bicing-lite",
    "homepage": null,
    "size": 1451,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "JavaScript",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": true,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master"
  }
]
