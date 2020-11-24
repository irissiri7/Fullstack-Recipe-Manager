<template>
  <div class="card">
    <div class="cnt">
      <img
        class="ui middle aligned small circular bordered image"
        src="../assets/profilepicture.jpeg"
      />
      <h1>My Profile</h1>
    </div>
    <form class="ui form">
      <h4 class="ui dividing header">Personal Information</h4>
      <div class="field">
        <label>Name</label>
        <div class="two fields">
          <div class="field">
            <input type="text" name="first-name" placeholder="First Name" />
          </div>
          <div class="field">
            <input type="text" name="last-name" placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="two fields">
          <div class="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div class="field">
            <label>Phone Number</label>
            <input type="text" name="phone-number" placeholder="Phone Number" />
          </div>
        </div>
      </div>
      <h4 class="ui dividing header">Food Preferences</h4>
      <div class="fields">
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" />
            <label>Vegetarian</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" />
            <label>Vegan</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" />
            <label>Lactose Free</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" name="example" />
            <label>Gluten Free</label>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="two fields">
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div class="field">
            <label style="visibility:hidden">Change Password</label>
            <button
              v-if="!changePassword"
              class="ui button"
              @click.prevent="changePassword = !changePassword"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div v-if="changePassword" class="field">
        <div class="two fields">
          <div class="field">
            <label>New Password</label>
            <input
              type="password"
              name="new-password"
              placeholder="New Password"
            />
          </div>
          <div class="field">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="new-password-confirmed"
              placeholder="Confirmed Password"
            />
          </div>
        </div>
      </div>
      <div v-if="changePassword" class="field">
        <button class="ui button">Change Password</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changePassword: false,
    };
  },
};
</script>

<style scoped>
h1 {
  display: inline;
  margin-left: 2rem;
  color: #30292f;
}
.ui.button {
  width: 100%;
}
.cnt {
  margin-bottom: 2rem;
}
</style>
