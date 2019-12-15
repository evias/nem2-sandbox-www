<template>
  <div>
    <b-form-group description="Your account public key or address."
                  label="Identify your account"
                  label-for="public-account-input"
                  :invalid-feedback="'Enter one of Address or Public Key'"
                  :state="isValid">
      <b-form-input v-bind:value="value"
                    v-on:input="onInput"
                    ref="input"
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
  name: 'PublicAccountInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      accountAddress: '',
      accountPublicKey: '',
      message: '',
      dirty: false,
      latestValid: false,
    };
  },
  computed: {
    isValid() {
      return this.dirty === true ? this.validate() : (
           this.value.length ? this.latestValid : null
      );
    },
    ...mapGetters({
      networkType: 'network/networkType'
    })
  },
  methods: {
    focus: function () {
      this.$refs.input.focus()
    },
    onInput() {
      this.$emit('input', $event.target.value)
      this.dirty = true
    },
    validate() {
      if (!this.dirty) {
        return this.latestValid
      }

      let isValid = false
      if (this.value.length === 40 || this.value.length === 46) {
        try {
          const plain = this.value.replace(/-/g, '')
          this.accountAddress = plain;
          isValid = Address.isValidRawAddress(plain, this.networkType);
        }
        catch (e) {}
      }
      else if (this.value.length === 64) {
        try {
          const pub = PublicAccount.createFromPublicKey(this.value, this.networkType)
          this.accountAddress = pub.address.plain();
          this.accountPublicKey = pub.publicKey;
          isValid = true
        }
        catch (e) {}
      }

      if (isValid) {
        this.$emit('changed', this.accountAddress)
      } else {
        this.$emit('error', this.value)
      }

      this.latestValid = isValid
      this.dirty = false
      return isValid;
    }
  }
}
</script>
