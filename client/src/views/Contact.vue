<template>
  <span>
    <ContactComponent />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactComponent from "@/components/pages/Contact.vue";

@Component({
  components: {
    ContactComponent
  }
})
export default class Contact extends Vue {}
</script>
