
//function getUser(name){
  var req = new XMLHttpRequest();
  var name = "marfeel";
  var url="https://api.github.com/users/"+name;
  req.open("GET", url, true);

  console.log(req.readyState);
  console.log(req);

  req.oneadystatechange = function(){
    if(req.status == 200 && req.response != "") {
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
