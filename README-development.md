**Front End Test**
--
This is the development of the Front End Test described [here](https://github.com/constanza101/FrontendTest).

**Technologies:**
--

* **HTML5:**
  * I have used semantic HTML, using `<section>` tags for each of the 3 larger sections: search, success and error. `<h>` tags for headings, `<p>` tags for general text, `<em>` and `<strong>` for semantic and style purpose. `<form>` to group the search inputs.


* **JavaScript-Vanilla:**
  * It was a requirement not to use any JS library or framework.
  * **AJAX**: I have chosen to use this way of making my HTTP requests, although there are [other ways](https://medium.freecodecamp.org/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa), this is the one which I considered best for this exercise with Vanilla JavaScript.
  * **Functional paradigm**: I have developed this app based on functional programming because it is more familiar and comfortable to me.


* **SASS:**
    * Variables: I have used **color variables** when a color is used in more than one element and **fonts variable** for an easy way to find and change if needed.
    * **Google Fonts**: Imported safe fonts.

**Script's  description:**
    --

* **Form prevent default**, to avoid refreshing the browser on submit.

``` javascript
SEARCH_FORM.addEventListener('submit', function(event) {
    event.preventDefault();
});
```

* **Event listener** to call the first function on submit.



``` javascript
const searchButtonElement = document.getElementById('searchButton');
searchButtonElement.addEventListener('click', function(event) {
    search();
});
});
```

* **First function: search()**:
  * Handles input value to search user.
    * If it is empty: cleans previous results.
    * If it contains a string: calls function getUser().

``` javascript
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
```

* **getUser()**
  * Receives 3 parameters:
    * userName
    * success callback function:
    * error callback function:
  * Makes the GET request to the Github user's endpoint using the **userName**.

```JavaScript
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
```    



* Iif user does not exist: calls **error function**.
* Iif user searched exists: calls **success function** described below:
  * Calls a function to print the user's personal details from the data received as a response from the GET request.
  * Calls function that makes a new GET request to the Github repositories endpoint for the current user.

```javascript
 function(userData) {
         printUserDetails(userData);
         searchRepos(urlRepos);
}
```    

* **printUserDetails()**: recieves the details of an user as an **object** and manipulates it to inject the required details into the **DOM**:

```JavaScript
function printUserDetails(data) {
    const loginName = data["login"];
    const fullName = data["name"];
    const description = data["bio"];
    const avatarUrl = data["avatar_url"];
    document.querySelector(".loginName").innerText = `@${loginName}`;
    document.querySelector(".fullName").innerText = fullName;
    document.querySelector(".description").innerText = description;
    document.querySelector("img").src = avatarUrl;
    document.querySelector("img").alt = loginName;
}
```   

* **searchRepos()**: recieves the user's repositories endpoint url -as a string and makes a GET request. If the request is successfull it calls a function to print a list of repositories.**printRepos()**


```javascript
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

```

* **printRepos()**: recieves a list of repositories from the repos endpoint as an **object** and iterates over it, printing the required values into a table in the **DOM**.


``` JavaScript

function printRepos(repos) {
    const starImg = '<img src="src/star.svg" alt="star">';
    const forkImg = '<img src="src/fork.svg" alt="forks">';
    const tableElement = document.querySelector("table");

    tableElement.innerHTML = ''; // Clean up the table content.
    RESULTS_DIV.style.display = "block";

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

```


* **showError()**: makes the error message visible.


```javascript
function showError() {
    NO_RESULTS_DIV.style.display = "block";
}
```
* **cleanForm()**: useful function to hide previously displayed results.

```javascript
function cleanForm() {
    RESULTS_DIV.style.display = "none";
    NO_RESULTS_DIV.style.display = "none";
}
```
