<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card no-body>
          <div slot="header">
            <i class='fa fa-user'></i> Add Contact QR
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card no-body>
          <div slot="header">
            <i class='fa fa-credit-card'></i> Import Private Key QR
            <div class="card-header-actions">
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse2>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>
          <b-collapse id="collapse2" visible>
            <b-card-body>
              
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card no-body>
          <div slot="header">
            <i class='fa fa-users'></i> Backup Mnemonic QR
            <div class="card-header-actions">
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse3>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>
          <b-collapse id="collapse3" visible>
            <b-card-body>
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card no-body>
          <div slot="header">
            <i class='fa fa-users'></i> Transaction Request QR
            <div class="card-header-actions">
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse4>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>
          <b-collapse id="collapse4" visible>
            <b-card-body>
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
            </b-card-body>
          </b-collapse>
        </b-card>
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

export const randomMnemonic1 = MnemonicPassPhrase.createRandom()
export const randomMnemonic2 = MnemonicPassPhrase.createRandom()

export default {
  name: 'qrcodes',
  components: {},
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
      transactionQR2: null
    };
  },
  computed: {
    mnemonic1: function() {
      return randomMnemonic1
    },
    mnemonic2: function() {
      return randomMnemonic2
    }
  },
  created() {
    this.initQR();
  },
  methods: {

    async initQR() {
      this.contactQR1 = await this.getContactQR(this.getAccount(1).publicAccount).toBase64().toPromise()
      this.contactQR2 = await this.getContactQR(this.getAccount(2).publicAccount).toBase64().toPromise()
      this.accountQR1 = await this.getAccountQR(this.getAccount(1)).toBase64().toPromise()
      this.accountQR2 = await this.getAccountQR(this.getAccount(2)).toBase64().toPromise()
      this.mnemonicQR1 = await this.getMnemonicQR(this.mnemonic1).toBase64().toPromise()
      this.mnemonicQR2 = await this.getMnemonicQR(this.mnemonic2).toBase64().toPromise()
      this.transactionQR1 = await this.getTransactionQR(1).toBase64().toPromise()
      this.transactionQR2 = await this.getTransactionQR(2).toBase64().toPromise()
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
