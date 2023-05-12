<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/WisdomLogo.svg" alt="img" />
    </div>
    <div class="companyName">
      <h4>WISDOM</h4>
      <p>CIRCLE</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.companyName h4 {
  color: #404554;
  font-family: "Poppins";
  font-weight: 600;
}

.companyName > * {
  margin: 0.1rem 0.1rem 0rem 1.2rem;
  scale: 1.2;
}
.companyName p {
  color: #888b94;
  font-family: "Poppins";
  margin-top: 0rem;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 940px) {
  .header {
    margin-top: -2rem;
    margin-left: -2.5rem;
    height: 6rem;
  }
  .logo img {
    height: 3.7rem;
  }
  .companyName h4 {
    font-size: 1.5rem;
  }
  .companyName p {
    font-size: 1.3rem;
  }
}
</style>
