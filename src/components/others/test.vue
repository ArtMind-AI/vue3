<template>
  <kinesis-container event="scroll">
    <kinesis-element
      标签="“img”"
      :transformOrigin="sunOrigin"
      ：强度="“100”"
      类型="“旋转”"
    />
    <kinesis-element
      :transformOrigin="earthmoonOrigin"
      ：强度="“800”"
      type="旋转"
    >
      <img :src="earth" />
      <kinesis-element
        标签="“img”"
        :src="月亮"
        :transformOrigin="月球原点"
        ：强度="“1200”"
        类型="“旋转”"
      />
    </kinesis-element>
    <kinesis-element
      标签="“img”"
      :src="火星"
      :transformOrigin="marsOrigin"
      ：强度="“500”"
      类型="“旋转”"
    />
  </kinesis-container>
</template>

<script setup></script>

<style scoped>
/* Your scoped styles go here */
</style>
