<template>
  <div>
    <b-form-group description="Spammer account private key."
                  label="Identify your account"
                  label-for="account-input"
                  :invalid-feedback="'Enter an account Private Key'"
                  :state="isValid">
      <b-form-input v-model="userInput"
                    placeholder="Enter an account Private Key"
                    trim
                    :state="isValid"
                    aria-describedby="input-live-help input-live-feedback"></b-form-input>
    </b-form-group>

    <div v-if="isValid">
      <b-form-group label="Account address" label-cols="3">
        <b-form-input disabled
                      v-model="accountAddress"></b-form-input>
      </b-form-group>

      <b-form-group label="Account public key">
        <b-form-input disabled
                      v-model="accountPublicKey"></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {
  Account,
  Address,
  NetworkType,
} from 'nem2-sdk';

export default {
  name: 'account-input',
  data() {
    return {
      userInput: '',
      accountAddress: '',
      accountPublicKey: '',
    };
  },
  computed: {
    isValid() {
      return !this.userInput.length ? null : this.validate();
    },
    ...mapGetters({
      networkType: 'network/networkType',
    })
  },
  methods: {
    validate() {

      if (this.userInput.length !== 64) {
        return false;
      }

      try {
        const acct = Account.createFromPrivateKey(this.userInput, this.networkType)
        this.accountAddress = acct.address.plain();
        this.accountPublicKey = acct.publicKey;

        return true;
      }
      catch (e) {}

      return false;
    }
  }
}
</script>
