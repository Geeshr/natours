<template>
  <div>
    <header>
      <div class="wrapper">
        <template v-if="!loggedIn">
          <form class="wrapper__login" @submit.prevent="login">
            <div class="wrapper__login__container">
              <label class="wrapper__login__label">Name</label>
              <input class="wrapper__login__input" v-model="loginData.name" type="name" />
              <br />
              <br />
              <label class="wrapper__login__label">Email</label>
              <input
                class="wrapper__login__input"
                v-model="loginData.email"
                type="email"
              />
              <br />
              <br />
              <label class="wrapper__login__label">Password</label>
              <input
                class="wrapper__login__input"
                v-model="loginData.password"
                type="password"
              />
              <br />
              <br />
            </div>

            <div class="wrapper__button-container">
              <button class="wrapper__button-container__login" type="submit">
                login
              </button>
            </div>
          </form>

          <form class="wrapper__signup" @submit.prevent="signup">
            <div class="wrapper__signup__container">
              <label class="wrapper__signup__label">Name: </label>
              <input
                class="wrapper__signup__input"
                v-model="signupData.name"
                type="text"
              />
              <br />
              <br />
              <label class="wrapper__signup__label">Email: </label>
              <input
                class="wrapper__signup__input"
                v-model="signupData.email"
                type="email"
              />
              <br />
              <br />
              <label class="wrapper__signup__label">Role: </label>
              <input
                class="wrapper__signup__input"
                v-model="signupData.role"
                type="text"
              />
              <br />
              <br />
              <label class="wrapper__signup__label">Password: </label>
              <input
                class="wrapper__signup__input"
                v-model="signupData.password"
                type="current-password"
              />
              <br />
              <br />
              <label class="wrapper__signup__label">Password Confirm :</label>
              <input
                class="wrapper__signup__input"
                v-model="signupData.passwordConfirm"
                type="current-password"
              />
            </div>

            <br />
            <br />
            <div class="wrapper__button-container">
              <button class="wrapper__button-container__signup" type="submit">
                sign up
              </button>
            </div>
          </form>
        </template>
        <template v-else>
          <HomePage :userData="loginData" :onLogout="handleLogout" />
        </template>
      </div>
    </header>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import HomePage from "./components/HomePage.vue";

export default {
  components: {
    HomePage,
  },
  setup() {
    const loginData = ref({
      email: "",
      id: "",
      name: "",
      password: "",
    });

    const signupData = ref({
      name: "",
      email: "",
      role: "",
      password: "",
      passwordConfirm: "",
    });

    const loggedIn = ref(false);

    onMounted(checkToken);

    async function login() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/v1/users/login",
          loginData.value
        );
        if (response.status === 200) {
          loggedIn.value = true;
          localStorage.setItem("token", response.data.token);
          console.log("login data", loginData.value);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }

    async function signup() {
      try {
        await axios.post("http://127.0.0.1:3000/api/v1/users/signup", signupData.value);
        await login();
      } catch (error) {
        console.error("Sign up error:", error);
      }
    }

    function checkToken() {
      const token = localStorage.getItem("token");
      if (token) {
        loggedIn.value = true;
      }
    }

    function handleLogout() {
      loggedIn.value = false;
      localStorage.removeItem("token");
    }

    return { loginData, signupData, loggedIn, login, signup, handleLogout };
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  &__container {
    display: felx;
  }

  &__login {
    border-radius: 15px;
    margin-top: 20px;

    box-shadow: 10px 10px 20px 5px rgb(116 122 123 / 4);
    width: 50%;
    height: auto;
    padding-top: 30px;
    margin-right: 30px;
    &__container {
      position: relative;
      left: 240px;
    }
    &__label {
      display: flex;
      justify-content: flex-start;
    }
    &__input {
      width: 40%;
      border-top: none;
      border-left: none;
      border-right: none;
      &:focus-visible {
        outline: none;
        border-top: none;
        border-left: none;
        border-right: none;
      }
    }
  }

  &__signup {
    border-radius: 15px;
    margin-top: 20px;
    box-shadow: 10px 10px 20px 5px rgb(116 122 123 / 4);
    width: 50%;
    height: auto;
    padding: 30px;
    margin-left: 30px;
    &__container {
      position: relative;
      left: 240px;
    }
    &__label {
      display: flex;
      justify-content: flex-start;
    }
    &__input {
      width: 40%;
      border-top: none;
      border-left: none;
      border-right: none;
      &:focus-visible {
        outline: none;
        border-top: none;
        border-left: none;
        border-right: none;
      }
    }
  }
  &__button-container {
    display: flex;
    justify-content: center;
    &__login {
      width: 40%;
      padding: 5px;
      border: 1px solid lightgrey;
      background-color: lightgray;
      border-radius: 5px;
      position: relative;
      top: 40px;
    }
    &__signup {
      width: 40%;
      padding: 5px;
      border: 1px solid lightgrey;
      background-color: lightgray;
      border-radius: 5px;
    }
  }
}
</style>
