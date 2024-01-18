const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');
const form = document.getElementById('github-form');

// Listen for form submit
form.addEventListener('submit', e => {

  // Prevent default form submit
  e.preventDefault();

  // Get search value
  const searchTerm = searchInput.value;

  // Fetch users
  fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      // Display users
      displayUsers(data.items);

      // Clear repos
      reposList.innerHTML = '';
    });

});

// Display users 
function displayUsers(users) {

  // Clear current list
  userList.innerHTML = '';

  // Loop through users
  users.forEach(user => {

    // Create li element
    const li = document.createElement('li');

    // Add text content
    li.textContent = user.login;

    // Append to list
    userList.appendChild(li);

    // Click handler
    li.addEventListener('click', () => {
      fetchRepos(user.repos_url);
    });

  });

}

// Fetch repos
function fetchRepos(url) {
  fetch(url)
    .then(res => res.json())
    .then(repos => {
      displayRepos(repos); 
    });  
}

// Display repos
function displayRepos(repos) {
  // Clear current repos
  reposList.innerHTML = '';

  // Loop over repos
  repos.forEach(repo => {
    const li = document.createElement('li');
    li.textContent = repo.name;
    reposList.appendChild(li);
  });
}