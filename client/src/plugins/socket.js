import VueSocketIO from "vue-socket.io";

const VueSocketPlugin = {
  install(app, options) {
    if (!options) {
      options = {};
    }

    const SocketIO = new VueSocketIO(options);

    app.config.globalProperties.$socket = SocketIO.io;
    app.config.globalProperties.$vueSocketIo = SocketIO;

    app.mixin({
      /**
       *  Assign runtime callbacks
       */
      beforeCreate() {
        if (!this.sockets) this.sockets = {};

        this.sockets.subscribe = (event, callback) => {
          this.$vueSocketIo.emitter.addListener(event, callback, this);
        };

        this.sockets.unsubscribe = event => {
          this.$vueSocketIo.emitter.removeListener(event, this);
        };
      },

      /**
       * Register all socket events
       */
      mounted() {
        if (this.$options.sockets) {
          Object.keys(this.$options.sockets).forEach(event => {
            if (event !== "subscribe" && event !== "unsubscribe") {
              this.$vueSocketIo.emitter.addListener(
                event,
                this.$options.sockets[event],
                this
              );
            }
          });
        }
      },

      /**
       * unsubscribe when component unmounting
       */
      beforeUnmount() {
        if (this.$options.sockets) {
          Object.keys(this.$options.sockets).forEach(event => {
            this.$vueSocketIo.emitter.removeListener(event, this);
          });
        }
      }
    });
  }
};

export { VueSocketPlugin };
