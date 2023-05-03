var html=`<nav class="navbar navbar-expand-lg top-fixed sticky-top  p-3 bg-white border navbar-light ">
<div class="container">

  <a class="navbar-brand " href="index.html">JSM Realty</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link active" href="index.html">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="properties.html">Properties</a>
      </li>
      <li class="nav-item" id="fav">
        <a class="nav-link" href="favorites.html">Favorites</a>
      </li>
      <li class="nav-item" id="adm">
        <a class="nav-link" href="admin/dashboard.html">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="calculator.html">Mortgage Calculator</a>
      </li>
      <li class="nav-item" id="my_bookings">
        <a class="nav-link" href="my_bookings.html">My Bookings</a>
      </li>
      <li class="nav-item" id="messages">
        <a class="nav-link" href="messages.html#last_msg">
        <span class="position-relative" tooltip="true" title="new messages">
            <i class="fas fa-comments"></i>
            <span id="msg_count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white">
                0
            </span>
        </span>
        </a>
      </li>
      <li class="nav-item" id="notifications">
        <a class="nav-link" href="notifications.html">
        <span class="position-relative" tooltip="true" title="unread messages">
            <i class="fas fa-bell"></i>
            <span id="not_count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white">
                0
            </span>
        </span>
        </a>
      </li>
      <li class="nav-item">
      <li class="nav-item" id="login-status"></li>
      </li>
    </ul>

  </div>
</div>
</nav>`;

document.getElementById('navbar').innerHTML=html;

const loginStatus = document.getElementById("login-status");
// var database = firebase.database();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let a = document.createElement("a");
    a.href = "index.html";
    a.classList.add("nav-link");
    a.innerHTML = "Logout";
    document.getElementById("fav").style.display = "block"
    document.getElementById("my_bookings").style.display = "block";
    document.getElementById("notifications").style.display = "block";
    document.getElementById("messages").style.display = "block";
    
    firebase.database().ref("notifications").orderByChild("user/email").equalTo(user.email)
    .once("value")
    .then((snapshot) => {
      let countNodes = 0;
      snapshot.forEach((childSnapshot) => {
        const node = childSnapshot.val();
        if (node.is_read === false) {
          countNodes++;
        }
      });
      document.getElementById("not_count").innerText=countNodes;
    });
    firebase.database().ref("messages").orderByChild("user/email").equalTo(user.email)
    .once("value")
    .then((snapshot) => {
      let countNodes = 0;
      snapshot.forEach((childSnapshot) => {
        const node = childSnapshot.val();
        if (node.is_read === false) {
          countNodes++;
        }
      });
      document.getElementById("msg_count").innerText=countNodes;
    });
    
    var admin = JSON.parse(sessionStorage.getItem("admin"));
    // console.log(admin);
    if (admin != null) {
      document.getElementById("adm").style.display = "block"
      document.getElementById("fav").style.display = "none"
    } else {
      document.getElementById("adm").style.display = "none"
    }

    a.onclick = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed Out");
          localStorage.removeItem('favorites');
        })
        .catch((e) => {
          console.error("Sign Out Error", e);
        });
    };
    loginStatus.appendChild(a);

  } else {
    let a = document.createElement("a");
    a.href = "signin.html";
    a.classList.add("nav-link");
    a.innerHTML = "Login";
    loginStatus.appendChild(a);
    document.getElementById("my_bookings").style.display = "none";
    document.getElementById("notifications").style.display = "none";
    document.getElementById("messages").style.display = "none";

    // <a class="nav-link" href="">Signup</a>
  }
});

function isUserLogin() {
  const user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false
  }

}