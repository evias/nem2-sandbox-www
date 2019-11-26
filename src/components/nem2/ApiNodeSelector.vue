<template>
  <div>
    <v-select v-model="selected"
              :options="nodeList"
              @input="switchNode"
              :state="isConnected">
      <template v-slot:first>
        <option :value="null" disabled>-- Please select a node --</option>
      </template>
    </v-select>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {NetworkType} from 'nem2-sdk';
import VSelect from '@alfsnd/vue-bootstrap-select'

// internal dependencies
import Helpers from '../../Helpers'
import networkConfig from '../../../config/network.conf.json';

export default {
  name: 'ApiNodeSelector',
  components: {
    VSelect,
  },
  props: {
    default: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: { 
        text: networkConfig.defaultNode.label,
        value: networkConfig.defaultNode.url
      },
      options: [],
      config: networkConfig,
      numSelections: 0,
      dirty: false,
    };
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
    }),
    isConnected() {
      return this.$store.getters['network/isConnected'];
    },
    nodeList() {
      return this.$store.getters['network/nodes'];
    },
    currentNode() {
      const currentNode = this.$store.getters['network/currentNode'];
      if (!currentNode || !currentNode.length) {
        return this.default.length ? Helpers.formatUrl(this.default) : this.config.defaultNode
      }

      return currentNode
    }
  },
  async created() {
    await this.$store.dispatch('network/initialize')
    this.selected = { 
        text: '(' + this.networkName(this.networkType) + ') ' + this.currentNode.url,
        value: this.currentNode.url
      };
  },
  methods: {
    async switchNode(url) {
      // fix for v-select which emits `input` even for *default* value.
      if (this.numSelections >= 1 && this.dirty === true) {
        this.$emit('changed', url);
        await this.$store.dispatch('network/setCurrentNode', url.value ? url.value : url)
        this.dirty = false
      }
      else if (this.numSelections >= 1) {
        this.dirty = true
      }

      ++this.numSelections
    },
    networkName(networkType) {
      switch(networkType) {
        default:
        case NetworkType.MIJIN_TEST:
          return 'mijinTest'

        case NetworkType.MIJIN:
          return 'mijin'

        case NetworkType.TEST_NET:
          return 'publicTest'

        case NetworkType.MAIN_NET:
          return 'public'
      }
    }
  }
}
</script>
