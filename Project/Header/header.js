async function loadComponent(id,file){
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  }

  console.log("Header is loading")
  loadComponent('header','../Header/header.html');
  loadComponent('footer','../Header/footer.html');