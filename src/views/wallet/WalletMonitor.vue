<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card header="Traffic &amp; Sales">
          <b-row>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="info">
                    <small class="text-muted">Current Block Height</small><br>
                    <strong class="h4">{{ this.chainHeight }}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-01" :data="[35, 23, 56, 22, 97, 23, 64]" variant="info" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Number of Transactions</small><br>
                    <strong class="h4">{{ this.numTransactions }}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-02" :data="[65, 59, 84, 84, 51, 55, 40]" variant="danger" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="warning">
                    <small class="text-muted">Number of Public Accounts</small><br>
                    <strong class="h4">{{ this.numPublicAccounts }}</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-03" :data="[35, 23, 56, 22, 97, 23, 64]" variant="#f8cb00" width="80" height="30"/>
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Network Type</small><br>
                    <strong class="h4">{{ this.networkName}}</strong>
                  </Callout>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import CalloutChart from '@/components/charts/CalloutChart'
import { Callout } from '@coreui/vue'

import Helpers from '../../Helpers.js'

export default {
  name: 'wallet',
  components: {
    Callout,
    CalloutChart
  },
  data: function () {
    return {
      info: 1
    }
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
      chainHeight: 'chain/height',
      numTransactions: 'chain/numTransactions',
      numPublicAccounts: 'chain/numPublicAccounts',
    }),
    networkName() {
      const networkType = this.networkType
      return Helpers.networkTypeToName(networkType)
    }
  },
  async mounted() {
    await this.$store.dispatch('initialize')
    await this.$store.dispatch('chain/initialize')
  }
}
</script>

<style>
</style>
