<template>
<!--
  <div>
    <b-card v-if="address.length > 0 && accountInfo !== null">
      <b-table :hover="true"
                :striped="true"
                :bordered="false"
                :small="false"
                :fixed="false"
                responsive="sm"
                :items="this.accountInfo.mosaics"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage">
        <template slot="id" slot-scope="data">
          <strong>{{getMosaicId(data.item.id)}}</strong>
        </template>
        <template slot="balance" slot-scope="data">
          <strong>{{getMosaicBalance(data.item.amount)}}</strong>
        </template>
      </b-table>
      <nav>
        <b-pagination size="sm"
                      :total-rows="this.accountInfo.mosaics.length"
                      :per-page="perPage"
                      v-model="currentPage"
                      prev-text="Prev"
                      next-text="Next"
                      hide-goto-end-buttons />
      </nav>
    </b-card>
  </div>
-->
  <div>
    <p>Now displaying MosaicList for address {{ accountAddress }}</p>
  </div>
</template>

<script>
import _ from 'lodash';
import {
  AccountHttp,
  Address,
  PublicAccount,
  NetworkType,
} from 'nem2-sdk';

export default {
  name: 'mosaic-list',
  props: {
    address: {
      type: String,
      default: '',
    },
    perPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      networkType: NetworkType.MIJIN_TEST,
      generationHash: '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
      endpointUrl: 'http://api-01.mt.eu-central-1.nemtech.network:3000',
      accountInfo: null,
      fields: [
        {key: 'id'},
        {key: 'balance'},
      ],
      currentPage: 1,
      accountAddress: this.address,
    };
  },
  methods: {
    validate() {
      if (!this.accountAddress || !this.accountAddress.length) {
        return false;
      }

      if (this.accountAddress.length === 40 || this.accountAddress.length === 46) {
        try {
          const plain = this.accountAddress.replace(/-/g, '')
          return Address.isValidRawAddress(plain);
        }
        catch (e) {}
      }

      return false;
    },

    async readInfo() {

      console.log("MosaicList validating address: ", this.accountAddress, this.validate());

      if (! this.validate()) {
        return false;
      }

      const accountHttp = new AccountHttp(this.endpointUrl)
      this.accountInfo = await accountHttp.getAccountInfo(Address.createFromRawAddress(this.accountAddress)).toPromise();
      console.log(this.accountInfo);

      return this.accountInfo;
    },

    getMosaicId(idDTO) {
      return idDTO;
    },

    getMosaicBalance(balanceDTO) {
      return balanceDTO;
    }
  }
}
</script>
