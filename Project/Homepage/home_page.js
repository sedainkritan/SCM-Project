(function(){
  const authButtons = document.getElementById('auth-buttons');
  const profileBlock = document.getElementById('profile-block');
  const avatarBtn = document.getElementById('avatar-btn');
  const profileMenu = document.getElementById('profile-menu');
  const menuLogout = document.getElementById('menu-logout');
  const menuStats = document.getElementById('menu-stats');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const welcome = document.getElementById('welcome');
  const statsSection = document.getElementById('user-stats');
  const exchangeCount = document.getElementById('exchangeCount');
  const purchaseCount = document.getElementById('purchaseCount');

  function getUser(){
    return JSON.parse(localStorage.getItem("sessionUser")) || JSON.parse(sessionStorage.getItem("sessionUser"));
  }

  function showLoggedIn(user){
    authButtons.style.display = 'none';
    profileBlock.style.display = 'flex';
    avatarBtn.setAttribute('tabindex','0');

    if(user){
      profileName.textContent = user.username;
      profileEmail.textContent = user.email;
      if(welcome) welcome.textContent = `Welcome back, ${user.username}`;
    }
  }

  function showLoggedOut(){
    authButtons.style.display = 'flex';
    profileBlock.style.display = 'none';
    avatarBtn.setAttribute('tabindex','-1');
    hideMenu();
    if(welcome) welcome.textContent = '';
    if(statsSection) statsSection.style.display = 'none';
  }

  function toggleMenu(){
    const shown = profileMenu.classList.toggle('show');
    profileMenu.setAttribute('aria-hidden', String(!shown));
    avatarBtn.setAttribute('aria-expanded', String(shown));
  }

  function hideMenu(){
    profileMenu.classList.remove('show');
    profileMenu.setAttribute('aria-hidden','true');
    avatarBtn.setAttribute('aria-expanded','false');
  }

  // ✅ New logout function
  function logout(){
    // Clear session data
    localStorage.removeItem("sessionUser");
    sessionStorage.removeItem("sessionUser");

    // Reset UI
    showLoggedOut();

    // Redirect back to homepage
    window.location.href = "./home_page.html";
  }

  // Initialize UI
  const user = getUser();
  if(user) showLoggedIn(user); else showLoggedOut();

  // Avatar toggles menu
  avatarBtn.addEventListener('click', function(e){
    e.stopPropagation();
    toggleMenu();
  });

  // Keyboard support
  avatarBtn.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    if (e.key === 'Escape') hideMenu();
  });

  // Logout
  menuLogout.addEventListener('click', function(e){
    e.preventDefault();
    logout();
  });

  // Show stats
  if(menuStats){
    menuStats.addEventListener('click', function(e){
      e.preventDefault();
      const user = getUser();
      if(user){
        let exchanges = user.exchanges || 0;
        let purchases = user.purchases || 0;
        exchangeCount.textContent = `Successful Exchanges: ${exchanges}`;
        purchaseCount.textContent = `Purchases: ${purchases}`;
        statsSection.style.display = 'block';
        hideMenu();
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e){
    if (!profileMenu.contains(e.target) && !avatarBtn.contains(e.target)) hideMenu();
  });

  // Close menu on Escape globally
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') hideMenu();
  });

  // Keep focus tidy
  profileMenu.addEventListener('focusout', function(){
    setTimeout(() => {
      if (!profileMenu.contains(document.activeElement) && document.activeElement !== avatarBtn) hideMenu();
    }, 10);
  });
})();
