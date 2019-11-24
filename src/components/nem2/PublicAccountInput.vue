<template>
  <div>
    <b-form-group description="Your account public key or address."
                  label="Identify your account"
                  label-for="public-account-input"
                  :invalid-feedback="'Enter one of Address or Public Key'"
                  :state="isValid">
      <b-form-input v-model="userInput"
                    placeholder="Enter an account public key or address"
                    trim
                    :state="isValid"
                    aria-describedby="input-live-help input-live-feedback"></b-form-input>
    </b-form-group>

    <div v-if="isValid">
      <b-form-group label="Account address" label-cols="3">
        <b-form-input disabled
                      v-model="accountAddress"></b-form-input>
      </b-form-group>

      <b-form-group label="Account public key" v-if="accountPublicKey.length > 0">
        <b-form-input disabled
                      v-model="accountPublicKey"></b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash';
import {
  AccountHttp,
  Address,
  PublicAccount,
  NetworkType,
} from 'nem2-sdk';

// internal deps
export default {
  name: 'public-account-input',
  data() {
    return {
      userInput: '',
      accountAddress: '',
      accountPublicKey: '',
      message: '',
    };
  },
  computed: {
    isValid() {
      return !this.userInput.length ? null : this.validate();
    },
    ...mapGetters({
      networkType: 'network/networkType'
    })
  },
  methods: {
    validate() {
      if (this.userInput.length === 40 || this.userInput.length === 46) {
        try {
          const plain = this.userInput.replace(/-/g, '')
          this.accountAddress = plain;
          return Address.isValidRawAddress(plain);
        }
        catch (e) {}
      }
      else if (this.userInput.length === 64) {
        try {
          const pub = PublicAccount.createFromPublicKey(this.userInput, this.networkType)
          this.accountAddress = pub.address.plain();
          this.accountPublicKey = pub.publicKey;
          return true
        }
        catch (e) {}
      }

      return false;
    }
  }
}
</script>
