<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card no-body>
          <div slot="header">
            <i class='fa fa-users'></i> Configure Accounts
            <div class="card-header-actions">
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>
          <b-collapse id="collapse1" visible>
            <b-card-body>
              <b-row>
                <b-col md="6">
                  <h3>Spammer Account</h3>

                  <AccountInput :userInput="spammer" />
                </b-col>
                <b-col md="6">
                  <h3>Recipient Account</h3>

                  <PublicAccountInput :userInput="recipient" />
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {
  NetworkType,
} from 'nem2-sdk'

// internal deps
import AccountInput from '@/components/nem2/AccountInput.vue'
import PublicAccountInput from '@/components/nem2/PublicAccountInput.vue'

export default {
  name: 'spammer',
  components: {
    AccountInput,
    PublicAccountInput,
  },
  data: () => {
    return { 
      spammer: '',
      recipient: '',
    };
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
    })
  },
  created() {},
  methods: {}
}
</script>

<style>

</style>
