<template>
  <div>
    <b-row>
      <b-col md="12">
        <Card
            class="card-f card-full-width"
            :loading="loadingWallet"
        >
          <template #title>
            <div><i class='fa fa-credit-card'></i> Wallet</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <PublicAccountInput :userInput="walletInput" 
                                @started="setLoading(true)"
                                @changed="setAddress"
                                @errored="setLoading(false)" />
          </template>
        </Card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6">
        <AccountInfo v-if="hasValidAddress"
                     :address="currentAddress" />
      </b-col>
      <b-col md="6">
        <MosaicList v-if="hasValidAddress"
                    :address="currentAddress" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

// internal dependencies
import Card from '@/components/containers/Card'
import PublicAccountInput from '@/components/nem2/PublicAccountInput'
import AccountInfo from '@/components/nem2/AccountInfo'
import MosaicList from '@/components/nem2/MosaicList'
import Helpers from '../../Helpers'

export default {
  name: 'WalletInfo',
  components: {
    PublicAccountInput,
    Card,
    AccountInfo,
    MosaicList,
  },
  data: function () {
    return {
      loadingWallet: false,
      walletInput: '',
      currentAddress: '',
      hasValidAddress: false,
    }
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
    })
  },
  async mounted() {
    await this.$store.dispatch('initialize')
  },
  methods: {
    setAddress(address) {
      this.currentAddress = address
      this.hasValidAddress = true
      this.setLoading(false)
    },
    setLoading(loading) {
      this.loadingWallet = !!loading
    }
  }
}
</script>

<style>
</style>
