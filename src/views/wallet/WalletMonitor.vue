<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card header="Traffic &amp; Sales">
          <b-row>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="info">
                    <small class="text-muted">New Clients</small><br>
                    <strong class="h4">9,123</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <!--<callout-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" variant="#20a8d8" width="80" height="30" />-->
                      <callout-chart-example chartId="callout-chart-01" :data="[35, 23, 56, 22, 97, 23, 64]" variant="info" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Recurring Clients</small><br>
                    <strong class="h4">22,643</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-02" :data="[65, 59, 84, 84, 51, 55, 40]" variant="danger" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Monday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress class="progress-xs" variant="info" :value="34" height={} />
                  <b-progress class="progress-xs" variant="danger" :value="78" height={} />
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Tuesday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="56" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="94" variant="danger"></b-progress>
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Wednesday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="12" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="67" variant="danger"></b-progress>
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Thursday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="43" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="91" variant="danger"></b-progress>
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Friday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="22" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="73" variant="danger"></b-progress>
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Saturday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="53" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="82" variant="danger"></b-progress>
                </div>
              </div>
              <div class="progress-group mb-4">
                <div class="progress-group-prepend">
                  <span class="progress-group-text">
                    Sunday
                  </span>
                </div>
                <div class="progress-group-bars">
                  <b-progress height={} class="progress-xs" :value="9" variant="info"></b-progress>
                  <b-progress height={} class="progress-xs" :value="69" variant="danger"></b-progress>
                </div>
              </div>
              <div class="legend text-center">
                <small>
                  <sup><b-badge pill variant="info">&nbsp;</b-badge></sup>
                  New clients
                  &nbsp;&nbsp;
                  <sup><b-badge pill variant="danger">&nbsp;</b-badge></sup>
                  Recurring clients
                </small>
              </div>
            </b-col>
            <b-col sm="12" lg="6">
              <b-row>
                <b-col sm="6">
                  <Callout variant="warning">
                    <small class="text-muted">Pageviews</small><br>
                    <strong class="h4">78,623</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-03" :data="[35, 23, 56, 22, 97, 23, 64]" variant="#f8cb00" width="80" height="30"/>
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Organic</small><br>
                    <strong class="h4">49,123</strong>
                    <div class="chart-wrapper" :style="{ top: '-10px'}">
                      <callout-chart-example chartId="callout-chart-04" :data="[65, 59, 84, 84, 51, 55, 40]" variant="#4dbd74" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <ul class="horizontal-bars type-2">
                <div class="progress-group">
                  <div class="progress-group-header">
                    <i class="icon-user progress-group-icon"></i>
                    <span class="title">Male</span>
                    <span class="ml-auto font-weight-bold">43%</span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="43" variant="warning"></b-progress>
                  </div>
                </div>
                <div class="progress-group mb-5">
                  <div class="progress-group-header">
                    <i class="icon-user-female progress-group-icon"></i>
                    <span class="title">Female</span>
                    <span class="ml-auto font-weight-bold">37%</span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="37" variant="warning"></b-progress>
                  </div>
                </div>
                <div class="progress-group">
                  <div class="progress-group-header">
                    <i class="icon-globe progress-group-icon"></i>
                    <span class="title">Organic Search</span>
                    <span class="ml-auto font-weight-bold">191,235 <span class="text-muted small">(56%)</span></span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="56" variant="success"></b-progress>
                  </div>
                </div>
                <div class="progress-group">
                  <div class="progress-group-header">
                    <i class="icon-social-facebook progress-group-icon"></i>
                    <span class="title">Facebook</span>
                    <span class="ml-auto font-weight-bold">51,223 <span class="text-muted small">(15%)</span></span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="15" variant="success"></b-progress>
                  </div>
                </div>
                <div class="progress-group">
                  <div class="progress-group-header">
                    <i class="icon-social-twitter progress-group-icon"></i>
                    <span class="title">Twitter</span>
                    <span class="ml-auto font-weight-bold">37,564 <span class="text-muted small">(11%)</span></span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="11" variant="success"></b-progress>
                  </div>
                </div>
                <div class="progress-group">
                  <div class="progress-group-header">
                    <i class="icon-social-linkedin progress-group-icon"></i>
                    <span class="title">LinkedIn</span>
                    <span class="ml-auto font-weight-bold">27,319 <span class="text-muted small">&nbsp;(8%)</span></span>
                  </div>
                  <div class="progress-group-bars">
                    <b-progress height={} class="progress-xs" :value="8" variant="success"></b-progress>
                  </div>
                </div>
                <div class="divider text-center">
                  <b-button variant="link" size="sm" class="text-muted"><i class="icon-options"></i></b-button>
                </div>
              </ul>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CardLine1ChartExample from '../dashboard/CardLine1ChartExample'
import CardLine2ChartExample from '../dashboard/CardLine2ChartExample'
import CardLine3ChartExample from '../dashboard/CardLine3ChartExample'
import CardBarChartExample from '../dashboard/CardBarChartExample'
import MainChartExample from '../dashboard/MainChartExample'
import SocialBoxChartExample from '../dashboard/SocialBoxChartExample'
import CalloutChartExample from '../dashboard/CalloutChartExample'
import { Callout } from '@coreui/vue'

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'fa fa-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: 'text-center'
        },
        user: {
          label: 'User'
        },
        country: {
          label: 'Country',
          class: 'text-center'
        },
        usage: {
          label: 'Usage'
        },
        payment: {
          label: 'Payment method',
          class: 'text-center'
        },
        activity: {
          label: 'Activity'
        }
      }
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
