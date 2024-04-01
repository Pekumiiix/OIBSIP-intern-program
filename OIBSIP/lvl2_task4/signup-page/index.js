// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsUA6-jOnae8uXuEvM4mUQZ4752Rs0eQY",
  authDomain: "intern-17ec9.firebaseapp.com",
  databaseURL: "https://intern-17ec9-default-rtdb.firebaseio.com",
  projectId: "intern-17ec9",
  storageBucket: "intern-17ec9.appspot.com",
  messagingSenderId: "408542557356",
  appId: "1:408542557356:web:213d8b922f7c28f23a9b09",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Authentication
const auth = getAuth(app);

//Initialize Realtime Database
const database = getDatabase(app);

function validateForm() {
  const emailInput = document.querySelector(".email");
  const paswordInputs = document.querySelectorAll(".password");
  const passWord = document.querySelector(".password-one");
  const confirmPassword = document.querySelector(".password-two");
  const inputs = document.querySelectorAll(".input");
  const errorMessageContainer = document.querySelector(".error-msg");

  const emailValue = emailInput.value.trim();
  const passwordValue = passWord.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      valid = false;

      input.classList.add("error");
      input.classList.remove("success");

      errorMessageContainer.innerHTML = "Kindly fill in your credentials";
    } else {
      valid = true;

      input.classList.remove("error");
      input.classList.add("success");

      errorMessageContainer.innerHTML = "";
    }
  });

  if (valid) {
    if (!isValidEmail(emailValue)) {
      valid = false;

      emailInput.classList.add("error");
      emailInput.classList.remove("success");

      errorMessageContainer.innerHTML = "Invalid email address";
    } else {
      valid = true;

      emailInput.classList.remove("error");
      emailInput.classList.add("success");

      errorMessageContainer.innerHTML = "";
    }
  }

  if (valid) {
    if (passwordValue.length < 6) {
      valid = false;

      paswordInputs.forEach((paswordInput) => {
        paswordInput.classList.add("error");
        paswordInput.classList.remove("success");
      });

      errorMessageContainer.innerHTML =
        "Password must be atleast 6 characters long";
    } else {
      valid = true;

      paswordInputs.forEach((paswordInput) => {
        paswordInput.classList.add("success");
        paswordInput.classList.remove("error");
      });

      errorMessageContainer.innerHTML = "";
    }
  }

  if (valid) {
    if (passwordValue != confirmPasswordValue) {
      valid = false;

      paswordInputs.forEach((paswordInput) => {
        paswordInput.classList.add("error");
        paswordInput.classList.remove("success");
      });

      errorMessageContainer.innerHTML = "Password do not match";
    } else {
      valid = true;

      paswordInputs.forEach((paswordInput) => {
        paswordInput.classList.add("success");
        paswordInput.classList.remove("error");
      });

      errorMessageContainer.innerHTML = "";
    }
  }

  return valid;
}

function submitForm() {
  const submitButton = document.querySelector(".submit-btn");
  //const form = document.getElementById('form')

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const email = document.querySelector(".email").value;
      const password = document.querySelector(".password-one").value;

      submitButton.value = "Loading...";

      registerNewUser(email, password);

      //console.log('form is valid')
    } else {
      //console.log('form is not valid')
    }
  });
}

submitForm();

function registerNewUser(email, password) {
  const submitButton = document.querySelector(".submit-btn");
  const errorMessageContainer = document.querySelector(".error-msg");
  const inputs = document.querySelectorAll(".input");
  const hashedPassword = md5(password);

  createUserWithEmailAndPassword(auth, email, hashedPassword)
    .then(() => {
      var user = auth.currentUser;

      set(ref(database, "users/" + user.uid), {
        email: email,
      }).then(() => {
        showPopUp();

        errorMessageContainer.innerHTML = "";

        //Redirect user after user data is stored in the database
        setTimeout(() => {
          window.location.href = "/login-page/index.html";
        }, 1200);
      });
      //alert('User created')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      submitButton.value = "SIGN UP";

      if (error.code === "auth/email-already-in-use") {
        errorMessageContainer.innerHTML = "User already exist";

        inputs.forEach((input) => {
          input.value = "";

          input.classList.remove("success");
          input.classList.remove("error");
        });
      }

      //console.log(errorMessage);
    });
}

function showPopUp() {
  const inputs = document.querySelectorAll(".input");
  const popUp = document.querySelector(".pop-up");

  popUp.style.display = "flex";

  inputs.forEach((input) => {
    input.value = "";
  });

  setTimeout(() => {
    popUp.style.display = "none";
  }, 1500);
}

/*const hashedValue = md5("password");
console.log(hashedValue);*/
