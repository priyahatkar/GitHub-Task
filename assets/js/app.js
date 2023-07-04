const cl = console.log;

const baseUrl ="https://api.github.com/users";
const formInfo = document.getElementById('formInfo');
const cardContainer = document.getElementById('cardContainer');
const userNameControl = document.getElementById('userName');
const content = document.getElementById('content');



const makeApiCall = (apiUrl) => {
    return fetch (apiUrl)

    .then(res => res.json())
}


const onSubmit = async (eve) => {
    eve.preventDefault()
    let val = userNameControl.value.toLowerCase();

    let promiseArr = [makeApiCall(`${baseUrl}/${val}`), makeApiCall(`${baseUrl}/${val}/repos?sort=created`)]

    let [userInfo, repoArray] = await Promise.all(promiseArr)
    eve.target.reset()
    
    let row = document.createElement("div")

    row.className ='row mb-5';
    row.innerHTML = `
                <div class="col-md-4">
                    <div class="img">
                        <img class="img-fluid rounded-circle" src="${userInfo.avatar_url}" alt="">
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="info text-white">
                        <h4 class="fullName">${userInfo.name}</h4>
                        <div class="d-flex mb-4 justify-content-between">
                            <span>${userInfo.followers} Followers</span>
                            <span>${userInfo.following} Following</span>
                            <span>${ repoArray.length} Repos</span>
                        </div>
                    </div>
                </div>
    `
    let gitLinks = repoArray.map(eve => eve.html_url).slice(0, 5)
        .map(link => `<a href="${link}" target="_blank">${link}</a>`).join('');

    const repoList = document.createElement('div')
    repoList.id = 'repoList'
    repoList.className = 'repoList'

    repoList.innerHTML = gitLinks;
    row.children[1].children[0].append(repoList);
    content.append(row)
} 

formInfo.addEventListener("submit", onSubmit) 