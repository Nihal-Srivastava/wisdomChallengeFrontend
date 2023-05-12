<template>
  <div class="main">
    <div class="pc">
      <div class="mainDiv">
        <CompanyLogo class="companyLogo" />
        <div class="signUpPage">
          <div>
            <div class="textsignUp">
              <h2>Create an Account</h2>
              <div class="signUp">
                <p>Already have an account?</p>
                <a href="/">Sign In</a>
              </div>
            </div>
            <div class="inputGroup">
              <input
                ref="firstNameRef"
                type="text"
                v-model="firstName"
                placeholder="First Name"
                class="name"
              />
              <div class="errMsg">
                <p>{{ firstNameError }}</p>
              </div>
              <input
                ref="lastNameRef"
                type="email"
                v-model="lastName"
                placeholder="Last Name"
                class="name"
              />
              <div class="errMsg">
                <p>{{ lastNameError }}</p>
              </div>
              <input
                ref="emailRef"
                type="email"
                v-model="email"
                placeholder="Email Id or Mobile Number"
                class="email"
              />

              <div class="errMsg">
                <p>{{ emailError }}</p>
              </div>

              <vue-tel-input
                ref="phoneRef"
                v-model="phone"
                defaultCountry="IN"
                class="phone"
                mode="international"
              >
              </vue-tel-input>
              <div class="errMsg">
                <p>{{ phoneError }}</p>
              </div>
              <div class="passDiv">
                <input
                  ref="passRef"
                  v-model="password"
                  placeholder="Password"
                  :type="showPassword ? 'password' : 'text'"
                  class="password"
                />
                <img
                  class="open"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="showPassword && passwordError"
                  src="../assets/Vector.png"
                  alt=""
                />
                <img
                  class="close"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="!showPassword && passwordError"
                  src="../assets/hidePassword.png"
                  alt=""
                />
                <img
                  class="open"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="showPassword && !passwordError"
                  src="../assets/openEye.png"
                  alt=""
                />
                <img
                  class="close"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="!showPassword && !passwordError"
                  src="../assets/closedEye.png"
                  alt=""
                />
              </div>
              <p class="errMsg">{{ passwordError }}</p>

              <div class="ack">
                <div style="margin-bottom: 18px">
                  Password must be atleast 8 characters
                </div>
                <div>
                  By clicking Sign Up, you are indicating that you have read and
                  acknowledged the Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
            <button @click="validate" class="button">Signup</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mainScreen">
      <div class="top">
        <MainLogo class="mainLogoMobile" />
        <div class="middle">
          <div>
            <div class="textsignUp">
              <h2>Create an Account</h2>
              <div class="signUp">
                <p>Already have an account?</p>
                <a href="/">Sign In</a>
              </div>
            </div>
            <div class="inputGroup">
              <input
                ref="firstNameRef"
                type="text"
                v-model="firstName"
                placeholder="First Name"
                class="name"
              />
              <div class="errMsg">
                <p>{{ firstNameError }}</p>
              </div>
              <input
                ref="lastNameRef"
                type="email"
                v-model="lastName"
                placeholder="Last Name"
                class="name"
              />
              <div class="errMsg">
                <p>{{ lastNameError }}</p>
              </div>
              <input
                ref="emailRef"
                type="email"
                v-model="email"
                placeholder="Email Id or Mobile Number"
                class="email"
              />

              <div class="errMsg">
                <p>{{ emailError }}</p>
              </div>

              <vue-tel-input
                ref="phoneRef"
                v-model="phone"
                defaultCountry="IN"
                class="phone"
                mode="international"
              >
              </vue-tel-input>
              <div class="errMsg">
                <p>{{ phoneError }}</p>
              </div>
              <div class="passDiv">
                <input
                  ref="passRef"
                  v-model="password"
                  placeholder="Password"
                  :type="showPassword ? 'password' : 'text'"
                  class="password"
                />
                <img
                  class="open"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="showPassword && passwordError"
                  src="../assets/Vector.png"
                  alt=""
                />
                <img
                  class="close"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="!showPassword && passwordError"
                  src="../assets/hidePassword.png"
                  alt=""
                />
                <img
                  class="open"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="showPassword && !passwordError"
                  src="../assets/openEye.png"
                  alt=""
                />
                <img
                  class="close"
                  :onclick="() => (showPassword = !showPassword)"
                  v-if="!showPassword && !passwordError"
                  src="../assets/closedEye.png"
                  alt=""
                />
              </div>
              <p class="errMsg">{{ passwordError }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footers">
        <ButtonVue @click="validate"> Sign Up </ButtonVue>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ButtonVue from "../components/Button.vue";
import MainLogo from "../components/MainLogo.vue";
import axios from "axios";
import CompanyLogo from "../components/CompanyLogo.vue";

let emailRef = ref<HTMLInputElement | null>(null);
let passRef = ref<HTMLInputElement | null>(null);
let firstNameRef = ref<HTMLInputElement | null>(null);
let lastNameRef = ref<HTMLInputElement | null>(null);
let phoneRef = ref<HTMLInputElement | null>(null);
let showPassword = ref(true);
let userDetails = ref();

onMounted(() => {
  emailRef.value!.focus();
  passRef.value!.focus();
});

let email = ref(""),
  password = ref(""),
  firstName = ref(""),
  lastName = ref(""),
  phone = ref(""),
  emailError = ref(""),
  passwordError = ref(""),
  firstNameError = ref(""),
  lastNameError = ref(""),
  phoneError = ref("");

let validate = async () => {
  console.log(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
    phone.value
  );

  if (!firstName.value) {
    firstNameError.value = "Please enter your first name";
    firstNameRef.value!.style.borderColor = "red";
    return;
  } else {
    firstNameError.value = "";
    firstNameRef.value!.style.borderColor = "inherit";
  }
  if (!lastName.value) {
    lastNameError.value = "Please enter your last name";
    lastNameRef.value!.style.borderColor = "red";
    return;
  } else {
    lastNameError.value = "";
    lastNameRef.value!.style.borderColor = "inherit";
  }

  if (!email.value.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/)) {
    emailError.value = "Please enter a valid Email ID";
    emailRef.value!.style.borderColor = "red";
    return;
  } else {
    emailError.value = "";
    emailRef.value!.style.borderColor = "inherit";
  }
  if (password.value.length < 8) {
    passwordError.value = `Password must be at least 8 characters`;
    passRef.value!.style.borderColor = "red";
    return;
  } else {
    passwordError.value = "";
    passRef.value!.style.borderColor = "inherit";
  }

  if (
    !phone.value.match(
      /^(\+[0-9]{1,3}\s?)?(\(?[0-9]{4,5}\)?[-.\s]?)?[0-9]{3,5}[-.\s]?[0-9]{0,3}$/
    )
  ) {
    phoneError.value = "Please enter a valid phone number";
    return;
  } else {
    phoneError.value = "";
  }

  axios
    .post(import.meta.env.VITE_MAIN_URL + "/auth/signup", {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
    })
    .then(function (response) {
      console.log(response);
      userDetails = response.data;
      console.log(userDetails);
      if (confirm("Hi " + email.value + " Welcome to WisdomCircle")) {
        window.location.href = "/";
      }
    })
    .catch(function (error) {
      console.log(error);
      let msg = error.response.data.message;
      if (msg === "Email already exists") {
        emailError.value = `Email already exists`;
        emailRef.value!.style.borderColor = "red";
      }
      if (msg === "Phone Number already exists") {
        phoneError.value = `Phone Number already exists`;
        phoneRef.value!.style.borderColor = "red";
      }
    });
};
</script>

<style>
.footers {
  display: none;
}
input {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
}

.inputGroup {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  margin: 1rem 0rem 0rem 0rem;
  width: 384px;
}

input {
  outline: none;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dcdee5;
  border-radius: 4px;
  padding: 0.1rem 0.5rem;
  margin-top: 0.7rem;
  height: 40px;
}
.companyLogo {
  display: flex !important;
}
.mainLogoMobile {
  display: none !important;
}
.errMsg {
  color: red;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  justify-content: start;
  width: 100%;
}

.inputGroup > *,
.textSignUp > * {
  margin: 0.2rem 0rem 0.2rem 0rem;
}

.inputGroup a {
  margin-left: 2rem;
}

.passDiv input {
  border: none;
  margin-top: 0rem;
}

.passDiv {
  display: flex;
  justify-content: center;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dcdee5;
  border-radius: 4px;
  margin-top: 0.7rem;
}

.passDiv img {
  position: relative;
  left: -15px;
  height: 15px;
  top: 20px;
  width: 21.65px;
}

input {
  font-size: 16px;
  font-weight: 400;
}

.emailOrPhoneNumber:focus,
.passDiv:focus {
  border: 1px solid black;
}
.phone {
  width: 100%;
}

.vti__input {
  margin: 0px;
}
.textSignUp {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}

.textSignUp h2 {
  font-family: "Poppins";
  font-size: 24px;
  line-height: 32px;
}

.textSignUp p {
  color: grey;
}

a {
  font-style: normal;
  font-weight: 600;
  text-align: center;
  color: #2558e5;
  cursor: pointer;
  font-size: smaller;
  margin: 2px 0px 0px 2px;
  font-family: "Poppins";
}

a:hover {
  border-bottom: 1px solid;
}

.signUp {
  display: flex;
}

.mainDiv {
  top: 0rem;
  left: 0rem;
  position: absolute;
  display: flex;
}

.signUpPage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 526px);
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0.1rem;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 11px 32px;
  background: #f1c12b;
  border-radius: 4px;
  border: none;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: black;
  margin: 1rem 0rem 0rem 0rem;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 940px) {
  .open,
  .close {
    margin-top: 8px;
  }
  .mainDiv {
    display: none !important;
  }
  .companyLogo {
    display: none !important;
  }
  .mainLogoMobile {
    display: flex !important;
  }
  .signUp {
    display: flex;
    font-size: 0.8rem;
    align-items: center;
  }
  .signUp a ~ p {
    margin-bottom: 5px;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 14px;
  }
  .textSignUp {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    margin: 0.1rem;
    font-family: "Poppins";
  }
  .textSignUp h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
  }
  .userDeets > * {
    margin: 0.5rem;
  }
  .textSignUp p {
    color: grey;
    font-size: 14px;
  }
  .textSignUp a {
    font-family: "Poppins";
  }
  .phone {
    width: 100%;
  }

  .vti__input {
    margin: 0px;
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0rem;
    left: 0rem;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  a {
    font-style: normal;
    font-weight: 600;
    text-align: center;
    color: #2558e5;
    cursor: pointer;
  }
  a:hover {
    border-bottom: 1px solid;
  }
  .passDiv {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #ffffff;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    margin-top: 0.7rem;
  }
  .passDiv img {
    position: relative;
    left: -15px;
    height: 0.7rem;
    top: 5px;
  }
  .close {
    height: 0.9rem !important;
  }
  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .middle {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    height: 30vh;
    position: relative;
    top: 2rem;
  }
  .signUp h2 {
    color: #121317;
  }
  .footers {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 9rem;
  }
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    margin: 0.1rem;
  }
  .mainScreen {
    width: 360px;
    height: 700px;
    background: white;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    position: relative;
    top: -2.5rem;
  }
  .mainScreen > * {
    padding: 1rem;
  }
  .inputGroup {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    margin: 1rem 0rem 0rem 0rem;
    width: 328px;
  }
  input {
    outline: none;
    width: 100%;
    background: #ffffff;
    border: 1px solid #dcdee5;
    border-radius: 4px;
    padding: 0.3rem 0.5rem;
    margin-top: 0.7rem;
  }
  .passDiv input {
    border: none;
    margin-top: 0rem;
  }
  .inputGroup a {
    width: fit-content;
  }
  * {
    letter-spacing: 0.05rem;
  }
}
</style>
