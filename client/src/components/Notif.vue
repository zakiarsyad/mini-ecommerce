<template>
    <div>
        <div v-if="alert.status === 'error'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong class="font-bold">Holy smokes!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
        <div v-if="alert.status === 'success'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong class="font-bold">Great!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'notif',
  props: ['alert']
}
</script>

<style>

</style>
