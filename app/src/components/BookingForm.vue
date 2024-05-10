<template>
  <div class="booking">
    <form class="booking__form" v-if="!bookingStatus" @submit.prevent="submitForm">
      <h2>Enter Card Information</h2>
      <br />

      <div>
        <label for="cardNumber">Card Number: </label>
        <input
          class="booking__form__input"
          type="text"
          id="cardNumber"
          v-model="cardInfo.cardNumber"
          required
        />
      </div>
      <br />
      <br />
      <div>
        <label for="cardHolder">Card Holder: </label>
        <input
          class="booking__form__input"
          type="text"
          id="cardHolder"
          v-model="cardInfo.cardHolder"
          required
        />
      </div>
      <br />
      <br />
      <div>
        <label for="expiryDate">Expiry Date: </label>
        <input
          class="booking__form__input"
          type="text"
          id="expiryDate"
          v-model="cardInfo.expiryDate"
          required
        />
      </div>
      <br />
      <br />
      <div>
        <label for="cvv">CVV: </label>
        <input
          class="booking__form__input"
          type="text"
          id="cvv"
          v-model="cardInfo.cvv"
          required
        />
      </div>
      <br />
      <br />
      <div class="booking__button-container">
        <button class="booking__button-container__button" type="submit">Submit</button>
      </div>
    </form>

    <div v-if="bookingStatus">
      <p>{{ bookingMessage }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { ref, reactive } from "vue";
import axios from "axios";

export default {
  props: {
    tourId: { type: String, default: "" },
  },
  setup(props) {
    const cardInfo = reactive({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    });

    const bookingStatus = ref(false);
    const bookingMessage = ref("");

    const submitForm = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:3000/api/v1/bookings`,
          cardInfo
        );
        console.log(response.data);
        if (response.status === 201) {
          bookingMessage.value = "Booking Successful! Thanks for your purchase!";
        } else {
          bookingMessage.value = "Booking Failed";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        bookingMessage.value = "Booking Failed";
      }
      bookingStatus.value = true;
    };

    return { cardInfo, submitForm, bookingStatus, bookingMessage };
  },
};
</script>
<style lang="scss">
.booking {
  font-family: sans-serif;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    border-radius: 15px;

    margin-top: 20px;
    -webkit-box-shadow: 10px 10px 20px 5px lightgray;
    -moz-box-shadow: 10px 10px 20px 5px lightgray;
    box-shadow: 10px 10px 20px 5px lightgray;
    width: 20%;
    height: auto;
    padding: 20px;
    &__input {
      width: 50%;
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

    &__button {
      width: 50%;
      padding: 5px;
      border: 1px solid lightgrey;
      background-color: lightgray;
      border-radius: 5px;
    }
  }
}
</style>
