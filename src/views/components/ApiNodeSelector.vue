<template>
  <div>
    <b-form-select v-model="selected" :options="nodeList" @change="switchNode">
      <template v-slot:first>
        <option :value="null" disabled>-- Please select a node --</option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
import {
  NetworkType,
} from 'nem2-sdk';

import networkConfig from '../../../config/network.conf.json';

export default {
  name: 'api-node-selector',
  data() {
    return {
      selected: networkConfig.defaultNode.url,
      options: [],
      config: networkConfig,
    };
  },
  computed: {
    nodeList() {
      return this.$store.getters['network/nodes'];
    },
    currentNode() {
      return this.$store.getters['network/currentNode'];
    }
  },
  created() {
    this.selected = this.currentNode;
  },
  methods: {
    async switchNode(url) {
      await this.$store.dispatch('network/setCurrentNode', url)
    }
  }
}
</script>
