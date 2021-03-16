<template>
  <v-card class="mt-3">
    <v-row>
      <v-col>
        <v-img
          class="shrink"
          contain
          src="@/assets/Feintool.png"
          transition="scale-transition"
          max-height="400px"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col>
        <v-card class="mt-3" flat>
          <v-card-text>
            <v-sheet max-width="500px">
              <v-sparkline
                :value="value"
                color="secondary"
                padding="10"
                stroke-linecap="round"
                smooth
                line-width="2"
              >
                <template v-slot:label="item">{{ item.value }}</template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>Lorem ipsum dolor sit Quisque lobortis purus ac nisi eleifend, sit amet commodo nisi imperdiet. Suspendisse vitae ultricies nisl, nec porttitor tortor. Pellentesque consectetur varius augue ut feugiat. Maecenas eget ultrices</v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({ value: [760, 423, 590, 446, 675, 510, 590, 610] })
};
</script>
