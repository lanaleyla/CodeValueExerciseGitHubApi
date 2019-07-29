
function searchUsers()
{
    const name = document.getElementById("name").value; //get user name
    fetch(`https://api.github.com/search/users?q=${name}`)
        .then(response => response.json())
        .then(data => {
            printUsers(data);
    })
    .catch(error => console.error(error))
}

//print the users
function printUsers(usersList)
{
    for(let i=0;i<30;i++) //print first 30 results related to the user name 
    {
        const name=usersList["items"][i]["login"]; //location name
        const repositoryLink=usersList["items"][i]["repos_url"];
        const userPageLink=usersList["items"][i]["html_url"];
        const imageUrl=usersList["items"][i]["avatar_url"];
        addUsers(name,imageUrl,repositoryLink,userPageLink); //add element to html page
    }
}

function addUsers (name,imageUrl,repositoryLink,userPageLink) { 

    const div=document.querySelector(".results");
    const divUserUnit=document.createElement("div");
    const divUser = document.createElement("div");
    const divImage=document.createElement("div");
    const divBtn=document.createElement("div");
    divBtn.setAttribute("class","btnLinks");

    //user information
    const node = document.createTextNode(name);
    const userName=document.createElement("p");
    userName.setAttribute("class","userName");
    userName.appendChild(node);

    const userImage=document.createElement("img");
    userImage.setAttribute("class","userImage");
    userImage.setAttribute("src", imageUrl);
    userImage.setAttribute("alt", "user");

    const repoLink=document.createElement("a");
    repoLink.setAttribute("class","linkToButton");
    //console.log(repositoryLink);
    repoLink.setAttribute("href","");
    repoLink.addEventListener("click", addRepositories);
    repoLink.link=repositoryLink;


    const reposText=document.createTextNode("Repositories");
    repoLink.appendChild(reposText);

    const userPage=document.createElement("a");
    const userText=document.createTextNode("User Page");
    userPage.setAttribute("target","_blank");
    userPage.setAttribute("href",userPageLink);
    userPage.setAttribute("class","linkToButton");
    userPage.appendChild(userText);
    divBtn.appendChild(userPage);
    divBtn.appendChild(repoLink);

    divUserUnit.setAttribute("class","user");
    divUser.setAttribute("class","user2");
    divUser.appendChild(userName);

    //divUser.appendChild(userImage);
    divImage.appendChild(userImage);
    //divUser.appendChild(repoLink);
    //divUser.appendChild(userPage);
    divUser.appendChild(divBtn);
    divUserUnit.appendChild(divImage); 
    divUserUnit.appendChild(divUser);
    div.appendChild(divUserUnit);
}

function addRepositories(event)
{
const results=document.querySelector(".results");
results.setAttribute("visibility", "hidden");
const the_repo=event.target.link;
fetch(the_repo)
.then(response => response.json())
.then(data => {
    //printUsers(data);
    console.log(data);
})
.catch(error => console.error(error))

}