import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      upId: this.$route.params.upId,
    };
  },
  computed: {
    ...mapState("user", ["upInfo"]),
    self() {
      return this.userInfo.id == this.upId;
    },
  },
  methods: {
    ...mapActions("user", ["getUpInfo"]),
  },
};
