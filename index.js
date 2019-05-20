console.log
//function getUser(name){
  var req = new XMLHttpRequest();
  var name = "marfeel";
  var url="https://api.github.com/users/"+name;
  req.open("GET", url, true);

  req.onreadystatechange = function(){
    if (req.readyState == 4) {
      if(req.status == 200 && req.response != "") {
        if(req.status == 200){
         //console.log("response"+req.response);
         const parsedResponse = JSON.parse(req.response);
         const loginName = parsedResponse["login"];
         const fullName = parsedResponse["name"];
         const description = parsedResponse["bio"];
         const reposUrl = parsedResponse["repos_url"];

         console.log("login: "+loginName);
         console.log("name: "+fullName);
         console.log("bio: "+description);
         console.log("repos_url: "+reposUrl);


       }else{
         console.log("Error loading page");
        }
      }
    }
  }
  req.send();



//}

/*
const parsedResponse = JSON.parse(req.response);

const loginName = parsedResponse["login"];
const fullName = parsedResponse["name"];
const description = parsedResponse["bio"];

const reposUrl = parsedResponse["repos_url"];

console.log(loginName);
//document.querySelector("ul").innerHTML = "<li> nombre: "+fullName+ ", temporadas: "+tempString+"</li>"
*/
