window.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('search-button');
  
    searchButton.addEventListener('click', () => {
      const usernameInput = document.getElementById('username-input');
      const username = usernameInput.value.trim();
  
      if (username !== '') {
        fetch(`https://api.github.com/users/${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.message === 'Not Found') {
              // User not found
              clearUserProfile();
              clearRepositoryList();
              alert('User not found. Please enter a valid GitHub username.');
            } else {
              // Update user profile information
              document.getElementById('avatar').src = data.avatar_url;
              document.getElementById('username').textContent = data.name || data.login;
              document.getElementById('bio').textContent = data.bio || '';
              document.getElementById('location').textContent = data.location || '';
              

              //Adding profile link
              const profileLink = document.getElementById('profile-link');
              profileLink.innerHTML = '';
              const link = document.createElement('a');
              link.href = data.html_url;
              link.textContent = 'View Profile';
              profileLink.appendChild(link);
  
              // Fetch repositories for the user
              fetch(`https://api.github.com/users/${username}/repos`)
                .then(response => response.json())
                .then(repositories => {
                  // Update repository list
                  const repositoryList = document.getElementById('repository-list');
                  repositoryList.innerHTML = '';
  
                  repositories.forEach(repo => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = repo.html_url;
                    link.textContent = repo.name;
                    listItem.appendChild(link);
                    repositoryList.appendChild(listItem);
                  });
                })
                .catch(error => {
                  console.log(error);
                  clearRepositoryList();
                  alert('An error occurred while fetching repositories. Please try again later.');
                });
            }
          })
          .catch(error => {
            console.log(error);
            clearUserProfile();
            clearRepositoryList();
            alert('An error occurred while fetching user data. Please try again later.');
          });
      } else {
        // Empty input
        clearUserProfile();
        clearRepositoryList();
        alert('Please enter a GitHub username.');
      }
    });
  
    function clearUserProfile() {
      document.getElementById('avatar').src = '';
      document.getElementById('username').textContent = '';
      document.getElementById('bio').textContent = '';
      document.getElementById('location').textContent = '';
      
    }
  
    function clearRepositoryList() {
      document.getElementById('repository-list').innerHTML = '';
    }
  });
  