<template>
  <div class="main">
    <div class="pc">
      <div class="mainDiv">
        <CompanyLogo class="companyLogo" />
        <div class="signInPage signIn">
          <div>
            <div class="textSignIn">
              <h2>Sign In to WisdomCircle</h2>
              <div class="signUp">
                <p>Don't have an account?</p>
                <a href="/signup">Sign up</a>
              </div>
            </div>
            <div class="inputGroup">
              <input
                ref="emailOrPhoneNumberRef"
                type="email"
                v-model="emailOrPhoneNumber"
                placeholder="Email or Mobile Number"
                class="emailOrPhoneNumber email"
              />
              <div class="errMsg">
                <p class="errMsg">{{ emailOrPhoneNumberError }}</p>
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
              <div class="errMsg">
                <p class="errMsg">{{ passwordError }}</p>
              </div>
              <a
                :onclick="() => router.push('forgotpassword')"
                class="forgotPassword"
                >Forgot password</a
              >
            </div>
            <button @click="validate" class="button">Sign In</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mainScreen">
      <div class="top">
        <MainLogo class="mainLogoMobile" />
        <div class="middle">
          <div class="signIn">
            <div class="textSignIn">
              <h2>Sign In to WisdomCircle</h2>
              <div class="signUp">
                <p>Don't have an account?</p>
                <a href="/signup">Sign up</a>
              </div>
            </div>
            <div class="inputGroup">
              <input
                ref="emailOrPhoneNumberRef"
                type="email"
                v-model="emailOrPhoneNumber"
                placeholder="Email Id or Mobile Number"
                class="email"
              />
              <div class="errMsg">
                <p class="errMsg">{{ emailOrPhoneNumberError }}</p>
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
              <div class="errMsg">
                <p class="errMsg">{{ passwordError }}</p>
              </div>
              <a
                :onclick="() => router.push('forgotpassword')"
                class="forgotPassword"
                >Forgot password</a
              >
            </div>
            <!-- <button @click="validate" class="button">Sign In</button> -->
          </div>
        </div>
      </div>
      <div class="footer">
        <ButtonVue @click="validate"> Sign in </ButtonVue>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, onMounted } from "vue";
import ButtonVue from "../components/Button.vue";
import MainLogo from "../components/MainLogo.vue";
import axios from "axios";
import CompanyLogo from "../components/CompanyLogo.vue";

let emailOrPhoneNumberRef = ref<HTMLInputElement | null>(null);
let passRef = ref<HTMLInputElement | null>(null);
let showPassword = ref(true);
let userDetails = ref();

onMounted(() => {
  emailOrPhoneNumberRef.value!.focus();
  passRef.value!.focus();
});

let emailOrPhoneNumber = ref(""),
  password = ref(""),
  emailOrPhoneNumberError = ref(""),
  passwordError = ref("");
let validate = async () => {
  console.log(emailOrPhoneNumber.value, password.value);
  if (
    !emailOrPhoneNumber.value.match(
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/
    ) &&
    !emailOrPhoneNumber.value.match(
      /^(\+[0-9]{1,3}\s?)?(\(?[0-9]{4,5}\)?[-.\s]?)?[0-9]{3,5}[-.\s]?[0-9]{0,3}$/
    )
  ) {
    emailOrPhoneNumberError.value =
      "Please enter a valid Email ID or Mobile Number";
    emailOrPhoneNumberRef.value!.style.borderColor = "red";
    return;
  } else {
    emailOrPhoneNumberError.value = "";
    emailOrPhoneNumberRef.value!.style.borderColor = "inherit";
  }
  if (password.value.length < 8) {
    passwordError.value = `Password must be at least 8 characters`;
    passRef.value!.style.borderColor = "red";
    return;
  } else {
    passwordError.value = "";
    passRef.value!.style.borderColor = "inherit";
  }

  axios
    .post(import.meta.env.VITE_MAIN_URL + "/auth/signin", {
      emailOrPhoneNumber: emailOrPhoneNumber.value,
      password: password.value,
    })
    .then(function (response) {
      console.log(response);
      userDetails = response.data;
      console.log(userDetails);
      alert("Hi " + emailOrPhoneNumber.value + " Welcome to WisdomCircle");
    })
    .catch(function (error) {
      console.log(error);
      let msg = error.response.data.message;
      if (msg === "User not found") {
        emailOrPhoneNumberError.value = `User not found`;
        emailOrPhoneNumberRef.value!.style.borderColor = "red";
      } else if (msg === "Incorrect Password") {
        passwordError.value = `Password is Incorrect`;
        passRef.value!.style.borderColor = "red";
      } else if (msg === "Could not signin") {
        passwordError.value = `It's not You, its us`;
        passRef.value!.style.borderColor = "red";
      }
    });
};
</script>

<style>
.footer {
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
  height: 48px;
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
.textSignIn > * {
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

.textSignIn {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}

.textSignIn h2 {
  font-family: "Poppins";
  font-size: 24px;
  line-height: 32px;
}

.textSignIn p {
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

.signInPage {
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
  .textSignIn {
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
  .textSignIn h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
  }
  .userDeets > * {
    margin: 0.5rem;
  }
  .textSignIn p {
    color: grey;
    font-size: 14px;
  }
  .textSignIn a {
    font-family: "Poppins";
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
    /* background-color: red; */
    position: relative;
    top: 2rem;
  }
  .signIn h2 {
    color: #121317;
  }
  .footer {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -2rem;
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
