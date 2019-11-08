<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
      <b-card>
        <div slot="header" v-html="caption"></div>
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="id" slot-scope="data">
            <strong>{{data.item.id}}</strong>
          </template>
          <template slot="networkType" slot-scope="data">
            <b-badge :variant="getBadge(data.item.networkType)">{{data.item.networkType}}</b-badge>
          </template>
          <template slot="name" slot-scope="data">
            <strong>{{data.item.name}}</strong>
          </template>
          <template slot="address" slot-scope="data">
            <strong>{{data.item.address}}</strong>
          </template>
        </b-table>
        <nav>
          <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import accountsData from './AccountsData'
export default {
  name: 'Accounts',
  props: {
    caption: {
      type: String,
      default: 'Accounts'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      items: accountsData,
      fields: [
        {key: 'id'},
        {key: 'networkType'},
        {key: 'name'},
        {key: 'address'},
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    }
  },
  computed: {
  },
  methods: {
    getBadge (networkType) {
      return networkType === 'MIJIN_TEST' ? 'secondary' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    accountLink (id) {
      return `accounts/${id.toString()}`
    },
    rowClicked (item) {
      const accountLink = this.accountLink(item.id)
      this.$router.push({path: accountLink})
    }

  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
