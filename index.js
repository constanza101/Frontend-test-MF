/*
 function getUserDataWithCallback(cb) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      cb(xhr.responseText)
    }
  }
  xhr.open('get', 'https://api.github.com/users/bluejack', true)
  xhr.send()
}
getUserDataWithCallback(function(text) {
  console.log(text)
})
*/

function search(){
    getUser(function(text) {
      console.log(text)
    })
}

function getUser(callback){
//  var name = "constanza101"
  var name = "constanza101"

  var urlUser="https://api.github.com/users/"+name;
  var urlRepos = "https://api.github.com/users/"+name+"/repos";
  var req = new XMLHttpRequest();
  req.open("GET", urlUser, true);
  req.onreadystatechange = function(){
    if (req.readyState == 4) {
      if(req.status == 200 && req.response != "") {
        if(req.status == 200){

         const parsedResponse = JSON.parse(req.response);
         callback(parsedResponse);
         printUserDetails(parsedResponse);
         console.log(urlRepos);
         searchRepos(name, urlRepos)
       }else{
         console.log("Error loading page");
        }
      }
   }
 }
 req.send();
}//getUser

function searchRepos(name, urlRepos){
var req = new XMLHttpRequest();
req.open("GET", urlRepos, true);
req.onreadystatechange = function(){
  if (req.readyState == 4) {
    if(req.status == 200 && req.response != "") {
      if(req.status == 200){
       const parsedResponse = JSON.parse(req.response);
       console.log(parsedResponse);
       printRepos(parsedResponse);
     }else{
       console.log("Error loading page");
      }
    }
  }
}
req.send();
} //fin-searchRepos()



function printUserDetails(data){
   const loginName = data["login"];
   const fullName = data["name"];
   const description = data["bio"];
   const reposUrl = data["repos_url"];
   const avatarUrl = data["avatar_url"]

   document.querySelector(".loginName").innerText = "@"+loginName;
   document.querySelector(".fullName").innerText = fullName;
   document.querySelector(".description").innerText = description;
   document.querySelector("img").src = avatarUrl;
   document.querySelector("img").alt = loginName;
}


function printRepos(repos){

  for (var i = 0; i < repos.length; i++) {
    console.log(repos[i]["name"]);
    let repoName = repos[i]["name"];
    let starImg = '<img src="src/star.svg" alt="star">'
    let stars = repos[i]["stargazers_count"];
    let forkImg = '<img src="src/fork.svg" alt="forks">'
    let forks = repos[i]["forks_count"];

    console.log(repoName, stars, forks);

    document.querySelector("table").innerHTML=
    document.querySelector("table").innerHTML +
    '<tr><th scope="row">'+repoName+'</th><td>'+starImg+' '+stars+' '+forkImg+' '+forks+'</td></tr>'

  }
}
