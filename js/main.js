// signUp inputs
var signUpName = document.querySelector("input#signUpName");
var signUpEmail = document.querySelector("input#signUpEmail");
var signUpPass = document.querySelector("input#signUpPass");
//signIn inputs
var signInEmail = document.querySelector("input#signInEmail");
var signInPass = document.querySelector("input#signInPass");
var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
var users = [];
var regex = {
  signUpName: {
    value: /.{3,}/,
    isValid: false,
  },
  signUpEmail: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    isValid: false,
  },
  signUpPass: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    isValid: false,
  },
};
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
function validateAddUser() {
  var user = {
    name: signUpName.value,
    email: signUpEmail.value,
    pass: signUpPass.value,
  };
  var emailNotExist = true;
  for (var i = 0; i < users.length; i++) {
    if (user.email == users[i].email) {
      emailNotExist = false;
      break;
    }
  }
  if (
    regex.signUpName.isValid &&
    regex.signUpEmail.isValid &&
    regex.signUpPass.isValid &&
    emailNotExist
  ) {
    document.querySelector("p.text-success").classList.remove("d-none");
    document.querySelector("p.text-danger").classList.add("d-none");
    users.push(user);
    setToStorage();
  } else {
    myModal.show();
    document.querySelector("p.text-danger").classList.remove("d-none");
    document.querySelector("p.text-success").classList.add("d-none");
  }
}

function clearFormInputs() {
  signUpName.value = signUpEmail.value = signUpPass.value = "";
  signUpName.classList.remove("is-valid", "is-invalid");
  regex.signUpName.isValid =
    regex.signUpEmail.isValid =
    regex.signUpPass.isValid =
      false;
  signUpEmail.classList.remove("is-valid", "is-invalid");
  signUpPass.classList.remove("is-valid", "is-invalid");
  document.querySelector("p.text-success").classList.add("d-none");
  document.querySelector("p.text-danger").classList.add("d-none");
}

function setToStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}
function validate(obj) {
  if (regex[obj.id].value.test(obj.value)) {
    obj.classList.add("is-valid");
    obj.classList.remove("is-invalid");
    regex[obj.id].isValid = true;
  } else {
    obj.classList.add("is-invalid");
    obj.classList.remove("is-valid");
    regex[obj.id].isValid = false;
  }
}
function validateSignIn() {
  if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
  } else {
    document.querySelector("p.incorrect").classList.remove("d-none");
    return;
  }
  for (var i = 0; i < users.length; i++) {
    if (
      signInEmail.value == users[i].email &&
      signInPass.value == users[i].pass
    ) {
      document.querySelector("p.incorrect").classList.add("d-none");
      displayHomePage(i);
      break;
    } else {
      document.querySelector("p.incorrect").classList.remove("d-none");
    }
  }
}

function displayHomePage(index) {
  document.body.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container">
        <a class="navbar-brand" href="#">Smart Login</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="btn btn-outline-warning"
                aria-current="page"
                href="../index.html"
                >LogOut</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <header>
      <div class="container text-center py-5">
        <div class="w-75 mx-auto p-5">
          <h1 class="mb-4">Welcome ${users[index].name}</h1>
        </div>
      </div>
    </header>
  
  `;
}
