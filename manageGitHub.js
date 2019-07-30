
let d;
let images = [];

function searchUsers() {
    const name = document.getElementById("name").value; //get user name from the input box
    fetch(`https://api.github.com/search/users?q=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            d = data;
            showUsers(data);
        })
        .catch(error => console.error(error))
}

//fetch repository data from the api
function searchRepos(event) {
    fetch(`https://api.github.com/users/${event.target.id}/repos`) //get the choosen users repositories list
        .then(response => response.json())
        .then(data => {
            showRepositories(data); //call to function that gets the information needed to show on view
        })
        .catch(error => console.error(error))
}

//print the users
function showUsers(usersList) {
    for (let i = 0; i < 30; i++) //print first 30 results related to the user name 
    {
        const name = usersList["items"][i]["login"]; //location name
        const repositoryLink = usersList["items"][i]["repos_url"];
        const userPageLink = usersList["items"][i]["html_url"];
        const imageUrl = usersList["items"][i]["avatar_url"];
        addUsers(name, imageUrl, repositoryLink, userPageLink); //add element to html page
    }
}

function showRepositories(usersList) {
    for (let i = 0; i < usersList.length; i++) {
        const repositoryFullName = usersList[i]["full_name"];
        const privateStatus = usersList[i]["private"];
        const numOfForks = usersList[i]["forks_count"];
        const numOfWatchers = usersList[i]["watchers_count"];
        const linkUrlToRepos = usersList[i]["html_url"];
        addRepositories(repositoryFullName, privateStatus, numOfForks, numOfWatchers, linkUrlToRepos); //add element to html page
    }

    //show back button and show repository div
    const Results = document.querySelector(".repositories");  //hide results div
    Results.setAttribute("style", "visibility: visible;");
    const button = document.querySelector(".backButton");  //hide results div
    button.setAttribute("style", "visibility: visible;");
}

function addUsers(name, imageUrl, repositoryLink, userPageLink) {

    images.push({ name, imageUrl }); //in case of reposetories click we need image and name of user

    const div = document.querySelector(".results"); //users list
    const divUserUnit = document.createElement("div");//warps the user with a border 
    const divUser = document.createElement("div"); //holds specific user
    const divImage = document.createElement("div");//holds the users image
    const divBtn = document.createElement("div"); //holds user page and repository link
    divBtn.setAttribute("class", "btnLinks");

    //user information
    const node = document.createTextNode(name);
    const userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    userName.appendChild(node);

    //user image
    const userImage = document.createElement("img");
    userImage.setAttribute("class", "userImage");
    userImage.setAttribute("src", imageUrl);
    userImage.setAttribute("alt", "user");

    //user repository link
    const repoLink = document.createElement("Button");
    repoLink.setAttribute("class", "linkToButton");
    repoLink.setAttribute("type", "button");
    repoLink.setAttribute("id", name);
    repoLink.addEventListener("click", searchRepos);
    repoLink.link = repositoryLink;
    const reposText = document.createTextNode("Repositories");
    repoLink.appendChild(reposText);

    //user user page on gitHub
    const userPage = document.createElement("a");
    const userText = document.createTextNode("User Page");
    userPage.setAttribute("target", "_blank");
    userPage.setAttribute("href", userPageLink);
    userPage.setAttribute("class", "linkToButton");
    userPage.appendChild(userText);
    divBtn.appendChild(userPage);
    divBtn.appendChild(repoLink);

    divUserUnit.setAttribute("class", "user");
    divUser.setAttribute("class", "userInfo");
    divUser.appendChild(userName);

    divImage.appendChild(userImage);
    divUser.appendChild(divBtn);
    divUserUnit.appendChild(divImage);
    divUserUnit.appendChild(divUser);
    div.appendChild(divUserUnit);
}


//add repositories to the index.html page
function addRepositories(repositoryFullName, privateStatus, numOfForks, numOfWatchers, linkUrlToRepos) {

    const divResults = document.querySelector(".results");  //hide results div
    divResults.setAttribute("style", "visibility: hidden; height:0;");

    const div = document.querySelector(".repositories"); //holds the list of the repositories
    const divRepoData = document.createElement("div");
    const divRepository = document.createElement("div");//holds the specific repository
    divRepoData.setAttribute("class", "repoData"); //holds info about the repository
    divRepository.setAttribute("class", "repository");

    //url of repository
    const repositoryPage = document.createElement("a");
    const userText = document.createTextNode(`URL: ${linkUrlToRepos}`);
    repositoryPage.setAttribute("target", "_blank");
    repositoryPage.setAttribute("href", linkUrlToRepos);
    repositoryPage.setAttribute("class", "pFix");
    repositoryPage.appendChild(userText);

    //full name of repository
    const name = document.createTextNode(repositoryFullName);
    const repositoryName = document.createElement("p");
    repositoryName.setAttribute("class", "userName");
    repositoryName.appendChild(name);

    //repository status (private: true || false)
    const private = document.createTextNode(`Private: ${privateStatus}`);
    const privateS = document.createElement("p");
    privateS.setAttribute("class", "pFix");
    privateS.appendChild(private);

    //number of forks
    const forks = document.createTextNode(`Forks: ${numOfForks}`);
    const forksCount = document.createElement("p");
    forksCount.setAttribute("class", "pFix");
    forksCount.appendChild(forks);

    //number of watchers
    const watchers = document.createTextNode(`Watchers: ${numOfWatchers}`);
    const watchersCount = document.createElement("p");
    watchersCount.setAttribute("class", "pFix");
    watchersCount.appendChild(watchers);

    divRepository.appendChild(repositoryName);
    divRepoData.appendChild(privateS);
    divRepoData.appendChild(forksCount);
    divRepoData.appendChild(watchersCount);
    divRepoData.appendChild(repositoryPage);
    divRepository.appendChild(divRepoData);
    div.appendChild(divRepository);
}

//hide the repository div
function hideRepositories() {
    const Results = document.querySelector(".repositories");  //hide repositories div
    Results.setAttribute("style", "visibility: hidden; height:0;");

    const divResults = document.querySelector(".results");  //show results div
    divResults.setAttribute("style", "visibility: visible;");

    const button = document.querySelector(".backButton");  //hide back button
    button.setAttribute("style", "visibility: hidden;");
}