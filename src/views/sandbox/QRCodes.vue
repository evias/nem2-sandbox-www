<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <Card
            class="card-f card-full-width"
            :loading="loadingContactQR"
        >
          <template #title>
            <div><i class='fa fa-user'></i> Add Contact QR</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapseContact>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <b-collapse id="collapseContact" visible>
              <b-row>
                <b-col md="6">
                  <img v-bind="{ src: contactQR1 }" width=250 />
                  <p>
                    Address: {{ getAccount(1).publicAccount.address.plain() }}<br />
                    JSON: {{ getContactQR(getAccount(1).publicAccount).toJSON() }}
                  </p>
                </b-col>
                <b-col md="6">
                  <img v-bind="{ src: contactQR2 }" width=250 />
                  <p>
                    Address: {{ getAccount(2).publicAccount.address.plain() }}<br />
                    JSON: {{ getContactQR(getAccount(2).publicAccount).toJSON() }}
                  </p>
                </b-col>
              </b-row>
            </b-collapse>
          </template>
        </Card>
      </b-col>
      <b-col md="6">
        <Card
            class="card-f card-full-width"
            :loading="loadingAccountQR"
        >
          <template #title>
            <div><i class='fa fa-user'></i> Export Private Key QR</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapseAccount>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <b-collapse id="collapseAccount" visible>
              <b-row>
                <b-col md="6">
                  <img v-bind="{ src: accountQR1 }" width=250 />
                  <p>
                    Address: {{ getAccount(1).address.plain() }}<br />
                    JSON: {{ getAccountQR(getAccount(1)).toJSON() }}
                  </p>
                </b-col>
                <b-col md="6">
                  <img v-bind="{ src: accountQR2 }" width=250 />
                  <p>
                    Address: {{ getAccount(2).address.plain() }}<br />
                    JSON: {{ getAccountQR(getAccount(1)).toJSON() }}
                  </p>
                </b-col>
              </b-row>
            </b-collapse>
          </template>
        </Card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <Card
            class="card-f card-full-width"
            :loading="loadingMnemonicQR"
        >
          <template #title>
            <div><i class='fa fa-user'></i> Export Mnemonic QR</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapseMnemonic>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <b-collapse id="collapseMnemonic" visible>
              <b-row>
                <b-col md="6">
                  <img v-bind="{ src: mnemonicQR1 }" width=250 />
                  <p>
                    m/44'/43'/0'/0'/0': {{ getAccount(1).address.plain() }}<br />
                    Mnemonic: {{ mnemonic1.plain }}<br />
                    JSON: {{ getMnemonicQR(mnemonic1).toJSON() }}
                  </p>
                </b-col>
                <b-col md="6">
                  <img v-bind="{ src: mnemonicQR2 }" width=250 />
                  <p>
                    m/44'/43'/0'/0'/0': {{ getAccount(2).address.plain() }}<br />
                    Mnemonic: {{ mnemonic2.plain }}<br />
                    JSON: {{ getMnemonicQR(mnemonic1).toJSON() }}
                  </p>
                </b-col>
              </b-row>
            </b-collapse>
          </template>
        </Card>
      </b-col>
      <b-col md="6">
        <Card
            class="card-f card-full-width"
            :loading="loadingTransactionQR"
        >
          <template #title>
            <div><i class='fa fa-user'></i> Transaction Request QR</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapseTransaction>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <b-collapse id="collapseTransaction" visible>
              <b-row>
                <b-col md="6">
                  <img v-bind="{ src: transactionQR1 }" width=250 />
                  <p>
                    Transaction: {{ getTransaction(1).serialize() }}<br />
                    JSON: {{ getTransactionQR(1).toJSON() }}
                  </p>
                </b-col>
                <b-col md="6">
                  <img v-bind="{ src: transactionQR2 }" width=250 />
                  <p>
                    Transaction: {{ getTransaction(2).serialize() }}<br />
                    JSON: {{ getTransactionQR(2).toJSON() }}
                  </p>
                </b-col>
              </b-row>
            </b-collapse>
          </template>
        </Card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  Account,
  Deadline,
  Mosaic,
  NamespaceId,
  NetworkType,
  Password,
  PlainMessage,
  TransferTransaction,
  UInt64,
} from 'nem2-sdk'
import { QRCodeGenerator } from 'nem2-qr-library'
import { ExtendedKey, MnemonicPassPhrase, Network, Wallet } from 'nem2-hd-wallets'
import Card from '@/components/containers/Card'

export const randomMnemonic1 = MnemonicPassPhrase.createRandom()
export const randomMnemonic2 = MnemonicPassPhrase.createRandom()

export default {
  name: 'qrcodes',
  components: {
    Card,
  },
  data: () => {
    return { 
      networkType: NetworkType.MIJIN_TEST,
      generationHash: '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB',
      contactQR1: null,
      contactQR2: null,
      accountQR1: null,
      accountQR2: null,
      mnemonicQR1: null,
      mnemonicQR2: null,
      transactionQR1: null,
      transactionQR2: null,
      isLoadingContactQR: true,
      isLoadingAccountQR: true,
      isLoadingMnemonicQR: true,
      isLoadingTransactionQR: true,
    };
  },
  computed: {
    mnemonic1: function() {
      return randomMnemonic1
    },
    mnemonic2: function() {
      return randomMnemonic2
    },
    loadingContactQR: function() {
      return this.isLoadingContactQR;
    },
    loadingAccountQR: function() {
      return this.isLoadingAccountQR;
    },
    loadingMnemonicQR: function() {
      return this.isLoadingMnemonicQR;
    },
    loadingTransactionQR: function() {
      return this.isLoadingTransactionQR;
    }
  },
  mounted() {
    this.initQR();
  },
  methods: {

    initQR() {
      // example contact QR codes
      this.getContactQR(this.getAccount(1).publicAccount).toBase64().subscribe((contactQR) => {
        this.contactQR1 = contactQR;
        this.isLoadingContactQR = false;
      });

      this.getContactQR(this.getAccount(2).publicAccount).toBase64().subscribe((contactQR) => {
        this.contactQR2 = contactQR;
        this.isLoadingContactQR = false;
      });

      // example account QR codes
      this.getAccountQR(this.getAccount(1)).toBase64().subscribe((accountQR) => {
        this.accountQR1 = accountQR;
        this.isLoadingAccountQR = false;
      });

      this.getAccountQR(this.getAccount(2)).toBase64().subscribe((accountQR) => {
        this.accountQR2 = accountQR;
        this.isLoadingAccountQR = false;
      });

      // example mnemonic QR codes
      this.getMnemonicQR(this.mnemonic1).toBase64().subscribe((mnemonicQR) => {
        this.mnemonicQR1 = mnemonicQR;
        this.isLoadingMnemonicQR = false;
      });
      this.getMnemonicQR(this.mnemonic2).toBase64().subscribe((mnemonicQR) => {
        this.mnemonicQR2 = mnemonicQR;
        this.isLoadingMnemonicQR = false;
      });

      // example transaction QR codes
      this.getTransactionQR(1).toBase64().subscribe((transactionQR) => {
        this.transactionQR1 = transactionQR;
        this.isLoadingTransactionQR = false;
      });
      this.getTransactionQR(2).toBase64().subscribe((transactionQR) => {
        this.transactionQR2 = transactionQR;
        this.isLoadingTransactionQR = false;
      });
    },

    getAccount(num) {
      const mnemonic = num === 1 ? this.mnemonic1 : this.mnemonic2
      const wallet = new Wallet(ExtendedKey.createFromSeed(mnemonic.toEntropy(), Network.CATAPULT))
      return wallet.getAccount()
    },

    getTransaction(num) {
      return TransferTransaction.create(
        Deadline.create(),
        this.getAccount(num).address,
        [new Mosaic(new NamespaceId('nem.xem'), UInt64.fromUint(1000000))],
        PlainMessage.create(''),
        this.networkType,
        UInt64.fromUint(1000000)
      )
    },

    getContactQR(contact) {
      const contactQR = QRCodeGenerator.createAddContact(
        'eVias Services',
        contact,
        this.networkType,
        this.generationHash
      );

      return contactQR
    },

    getAccountQR(account) {
      const accountQR = QRCodeGenerator.createExportAccount(
        account,
        'Catapult123',
        this.networkType,
        this.generationHash
      )

      return accountQR
    },

    getMnemonicQR(mnemonic) {
      const mnemonicQR = QRCodeGenerator.createExportMnemonic(
        mnemonic,
        'Catapult123',
        this.networkType,
        this.generationHash
      )

      return mnemonicQR
    },

    getTransactionQR(num) {
      const transactionQR = QRCodeGenerator.createTransactionRequest(
        this.getTransaction(num),
        this.networkType,
        this.generationHash
      )

      return transactionQR
    }
  }
}
</script>

<style>

</style>
