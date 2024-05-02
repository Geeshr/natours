<template>
  <div>
    <h2>All my bookings!</h2>
    <div>
      {{ console.log("bookings", bookings) }}
      <div v-for="(booking, index) in bookings" :key="index">
        <div v-for="(trip, idx) in booking.data" :key="idx">
          {{ trip._id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const bookings = ref([]);

    const getAllBookings = async () => {
      try {
        const response = await axios.get("/api/v1/bookings");
        bookings.value = response.data;
        console.log("All bookings:", bookings.value);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    onMounted(() => {
      getAllBookings();
    });

    return {
      bookings,
    };
  },
};
</script>

<style></style>
