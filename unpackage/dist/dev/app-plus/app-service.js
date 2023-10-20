if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  const _sfc_main$1 = {
    data() {
      return {
        title: "Hello",
        isRecording: false,
        tempFilePath: "",
        voicePath: ""
      };
    },
    onLoad() {
      let self = this;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/index/index.vue:35", "recorder stop" + JSON.stringify(res));
        self.voicePath = res.tempFilePath;
      });
    },
    methods: {
      takePhoto() {
        uni.chooseImage({
          sourceType: ["camera"],
          success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            this.saveImageToPhotosAlbum(tempFilePaths[0]);
            this.uploadFile(tempFilePaths[0]);
          }
        });
      },
      saveImageToPhotosAlbum(filePath) {
        uni.saveImageToPhotosAlbum({
          filePath,
          // 这里的 filePath 是拍摄的照片的临时文件路径
          success: () => {
            formatAppLog("log", "at pages/index/index.vue:56", "保存到手机相册成功！！");
          }
        });
      },
      startRecording() {
        uni.startRecord({
          success: (res) => {
            this.isRecording = true;
            this.tempFilePath = res.tempFilePath;
          },
          fail: (err) => {
            formatAppLog("error", "at pages/index/index.vue:67", "录音失败", err);
          }
        });
      },
      stopRecording() {
        if (this.isRecording) {
          uni.stopRecord();
          this.uploadFile(this.tempFilePath);
          this.isRecording = false;
        }
      },
      startRecord() {
        formatAppLog("log", "at pages/index/index.vue:79", "开始录音");
        recorderManager.start();
      },
      endRecord() {
        formatAppLog("log", "at pages/index/index.vue:84", "录音结束");
        recorderManager.stop();
      },
      playVoice() {
        formatAppLog("log", "at pages/index/index.vue:88", "播放录音");
        if (this.voicePath) {
          innerAudioContext.src = this.voicePath;
          innerAudioContext.play();
        }
      },
      uploadFile(filePath) {
        uni.uploadFile({
          url: "",
          filePath,
          name: "file",
          success: (uploadRes) => {
            formatAppLog("log", "at pages/index/index.vue:101", "照片上传成功", uploadRes.data);
          },
          fail: (uploadErr) => {
            formatAppLog("error", "at pages/index/index.vue:106", "照片上传失败", uploadErr);
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: "/static/logo.png"
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($data.title),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.takePhoto && $options.takePhoto(...args))
        }, "拍照上传")
      ]),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.startRecord && $options.startRecord(...args))
        }, "开始录音"),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.endRecord && $options.endRecord(...args))
        }, "停止录音"),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.playVoice && $options.playVoice(...args))
        }, "播放录音")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/Develop/TestProject/TestUniapp/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Develop/TestProject/TestUniapp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
