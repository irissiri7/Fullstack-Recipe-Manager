<template>
  <div class="card">
    <div class="flex-cnt">
      <h2>Mumisg Gryta</h2>
      <div>
        <button class="ui icon button">
          <i class="pencil alternate icon inverted"></i>
        </button>
        <button class="ui icon button">
          <i class="trash icon inverted"></i>
        </button>
      </div>
    </div>
    <div img-cnt>
      <img
        src="https://img.koket.se/wide-large/chicken-cashew.jpg"
        alt="dish"
      />
    </div>
    <h3>Ingredients</h3>
    <ul>
      <li>Ingredient 1</li>
      <li>Ingredient 2</li>
      <li>Ingredient 3</li>
    </ul>
    <h3>Description</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium
      maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam
      placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa
      soluta.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  list-style: none;
}
.img-cnt {
  width: 100%;
  height: 10rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.flex-cnt {
  display: flex;
  justify-content: space-between;
}
</style>
