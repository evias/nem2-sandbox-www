<template>
    <div class="card">
        <div class="card-header">
            <slot name="header" />
            <slot name="title" />
            <slot name="control" />
        </div>

        <div v-if="loading" class="card-loading">
            <Loading />
        </div>

        <div v-if="error" class="card-error">
            <slot name="error" />
        </div>

        <div v-if="!error && !loading" class="card-body">
            <slot name="body" />
        </div>

    </div>
</template>

<script>
import Loading from '@/components/controls/Loading.vue'

export default {
  components: {
    Loading
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
    padding: 20px;
    box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.18);
    background: #fff;
    border-radius: 4px;
    border: none;
    margin-bottom: 20px;
    transition: all 0.5s ease-in-out;
    position: relative;

    .card-loading {
        height: 187px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 500;
        color: #393939;
    }

    .card-body {
        position: relative;
        display: block;
    }

    .card-error {
        font-size: 14px;
        color: #98a8b4;
        display: flex;
        justify-content: center;
    }
}
</style>
