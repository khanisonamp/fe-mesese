<template>
    <div>
        <navber />
        <h1>Comming zoon Dispatching</h1>
    </div>
</template>

<script>
import navber from "../../lavouts/navber.vue";

export default {
  components: {
    navber,
  },
  props: ["itemStock", "dialogAddStock"],
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>
