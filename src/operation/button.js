// prettier-ignore
export default {
  name: 'OperationButton',

  props: ['option'],

  render(h) {
    return h(
      'el-button',
      {
        props: Object.assign(
          {
            size: 'small'
          },
          this.option
        ),
        on: {
          click: this.click
        }
      },
      this.$slots.default
    )
  },

  methods: {
    click() {
      this.$emit('click')
    }
  }
};
