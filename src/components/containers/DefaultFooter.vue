<template>
      <TheFooter>
        <div>
          <span class="ml-1">
              <a href="https://github.com/evias-services">
                <i class="fa fa-github"></i>&nbsp;Github</a>
              </span>
          | <span class="ml-1">
              <a href="https://twitter.com/eVias">
                <i class="fa fa-twitter"></i>&nbsp;Twitter</a>
              </span>
          | <span class="ml-1">
              <a href="https://facebook.com/eViasServices">
                <i class="fa fa-facebook"></i>&nbsp;Facebook</a>
              </span>
          | <span class="ml-1">
              <a href="https://www.linkedin.com/in/evias/">
                <i class="fa fa-linkedin"></i>&nbsp;LinkedIn</a>
              </span>
        </div>
        <div class="ml-auto">
          <a href="https://nem2.evias.be">Catapult Sandbox</a>
          <span class="ml-1">&copy; 2019 to present <a href="https://evias.be">eVias Services.</a></span>
          <span class="mr-1">| Powered by</span>
          <a href="https://coreui.io">CoreUI for Vue</a>
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
}
</script>
