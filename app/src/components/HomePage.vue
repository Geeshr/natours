<template>
  <div class="home">
    <nav class="home__nav">
      <div class="home__nav__user">
        <p class="home__nav__user__text">Hi!</p>
        <img
          class="home__nav__user__image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nO3WvwpBYRjH8W8ZSAaUgZmLMLoFLkEZZFeschk2dyCZlEUWJrKQC0BRkkV06j3jeZz39Lwl+dZvOn8+wzmdDvz70lJAF1gBN7Ml0DHHnFQC9sArYDugqI0mga2A+tsACU24FQL119SEZxbwVBM+W8AnTfhhAXvnqnWwgL03X62xBTzShBsWcF0TzgLXEOgFyKBcNwTcxkEJYCGgcyCOowoCnMdxr4Dxk3BNgKvaWAyoAEPgKcBPc07FXBO5MjAAjhYfD39Hc613j9DlgEkELGgTc0+xzIffm6jbAWkJ7jtA/fUkeOMQXkvw3SF8//Sc/+GiN3b4Ij8AwzjdAAAAAElFTkSuQmCC"
        />

        <button class="home__nav__logout" v-if="userData" @click="logout">Logout</button>
      </div>

      <div class="home__nav__wrapper">
        <button class="home__nav__wrapper__button" @click="showAllTours">
          All Tours!
        </button>
        <button class="home__nav__wrapper__button" @click="showCreateTour">
          Create Tour!
        </button>
        <button class="home__nav__wrapper__button" @click="showTopFiveCheap">
          Top 5 cheapest Tour!
        </button>
        <button class="home__nav__wrapper__button" @click="showAllBookings">
          All my bookings!
        </button>
        <button
          class="home__nav__wrapper__button"
          v-if="showBackButton"
          @click="goToHome"
        >
          Back
        </button>
      </div>
    </nav>
    <div class="home__wrapper">
      <component :is="selectedComponent" :userData="userData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import CreateTour from "./CreateTour.vue";
import AllTours from "./AllTours.vue";
import TopFiveCheapestTours from "./TopFiveCheapestTours.vue";
import AllBookings from "./AllBookings.vue";

export default {
  props: {
    userData: { type: Object, default: null },
    onLogout: { type: Function, required: true }, // New prop to handle logout event
  },
  components: {
    CreateTour,
    AllTours,
    TopFiveCheapestTours,
    AllBookings,
  },
  setup(props) {
    const selectedComponent = ref(null);
    const showBackButton = ref(false);

    const showAllTours = () => {
      selectedComponent.value = AllTours;
      showBackButton.value = true;
    };

    const showCreateTour = () => {
      selectedComponent.value = CreateTour;
      showBackButton.value = true;
    };

    const showTopFiveCheap = () => {
      selectedComponent.value = TopFiveCheapestTours;
      showBackButton.value = true;
    };

    const showAllBookings = () => {
      selectedComponent.value = AllBookings;
      showBackButton.value = true;
    };

    const goToHome = () => {
      selectedComponent.value = null;
      showBackButton.value = false;
    };

    const logout = async () => {
      try {
        await axios.get("/api/v1/users/logout");
        props.onLogout(); // Emit the logout event
        console.log("Logged out successfully");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return {
      selectedComponent,
      showBackButton,
      showAllTours,
      showCreateTour,
      goToHome,
      showTopFiveCheap,
      showAllBookings,
      logout,
    };
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  &__nav {
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    background: lightgray;
    margin-top: 15px;
    position: relative;
    bottom: 15px;
    display: flex;
    justify-content: space-between;
    &__user {
      display: flex;
      align-items: baseline;
      &__text {
        font-size: 18px;
        text-transform: uppercase;
      }
      &__image {
        position: relative;
        top: 4px;
      }
    }
    &__logout {
      border: none;
      background: none;
      text-decoration: underline;
      text-transform: uppercase;
      cursor: pointer;
    }
    &__wrapper {
      display: flex;
      &__button {
        border: none;
        background: none;
        text-decoration: underline;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
  }
  // &__wrapper {
  //   display: flex;
  // }
}
</style>
