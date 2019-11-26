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
                    aria-describedby="input-live-help input-live-feedback"
                    @change="setDirty"
                    @keyup="setDirty"></b-form-input>
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
  name: 'PublicAccountInput',
  data() {
    return {
      userInput: '',
      accountAddress: '',
      accountPublicKey: '',
      message: '',
      dirty: false,
      latestValid: false,
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
    setDirty() {
      this.dirty = true
    },
    validate() {
      if (!this.dirty) {
        return this.latestValid
      }

      let isValid = false
      if (this.userInput.length === 40 || this.userInput.length === 46) {
        this.$emit('started', true)
        try {
          const plain = this.userInput.replace(/-/g, '')
          this.accountAddress = plain;
          isValid = Address.isValidRawAddress(plain, this.networkType);
        }
        catch (e) {}
      }
      else if (this.userInput.length === 64) {
        this.$emit('started', true)
        try {
          const pub = PublicAccount.createFromPublicKey(this.userInput, this.networkType)
          this.accountAddress = pub.address.plain();
          this.accountPublicKey = pub.publicKey;
          isValid = true
        }
        catch (e) {}
      }

      if (isValid) {
        this.$emit('changed', this.accountAddress)
      }
      else {
        this.$emit('errored', this.userInput)
      }

      this.latestValid = isValid
      this.dirty = false
      return isValid;
    }
  }
}
</script>
