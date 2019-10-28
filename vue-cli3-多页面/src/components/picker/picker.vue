<template>
  <div>
    <div
      @touchmove.stop.prevent
      v-show="show"
      @click="close"
      class="layer-mask"
    ></div>

    <div
      class="layer-picker "
      :class="{'layer-picker-active':show,'layer-picker-show':pickerShow}"
    >
      <div class="layer-picker-head">
        <a
          href="javascript:;"
          @click.stop="close"
        >{{cancelText}}</a>
        <a
          href="javascript:;"
          @click.stop="sureMethod"
        >{{confirmText}}</a>
      </div>
      <div class="layer-picker-content">
        <div class="layer-picker-item">
          <div
            class="layer-picker-item-box"
            :ref="'Component'"
          >
            <div
              class="layer-picker-item-content"
              :ref="'Content'"
            >
              <span
                v-for="(item,key) in cloumn"
                :data-value="item.id"
                v-html="item.name"
                :key="key"
              ></span>
            </div>
          </div>
        </div>
        <div class="layer-picker-shade"></div>
        <div class="layer-picker-indicator"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { isIOS, pageScroll } from "../../assets/js/assist";
import { debouce } from "../../assets/js/units";
import Scroller from "./scroller";

export default {
  props: {
    cloumn: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultInit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickerShow: false, //默认隐藏
      itemHeight: 38,
      show: false,
      scroller: "",
      cancelText: "取消",
      confirmText: "确定",
      currentValue: "",
      currentIndex: 0,
      maskerOpacity: 0.5
    };
  },
  components: {
    // "layer-mask": Mask
  },
  watch: {
    cloumn: {
      handler(cval, oval) {
        console.log("监控到数据改变了");
        this.$nextTick(() => {
          if (!this.defaultInit) {
            if (this.scroller) {
              this.scroller.removeListion();
            }
            this.init();
          }
        });
      },
      deep: true
    }
  },
  created() {
    // this.init();
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      if (this.defaultInit) {
        this.init();
      }
    });

   
  },
  beforeDestroy() {
  
  },
  methods: {
    init() {
      const _this = this;

      const component = _this.$refs["Component"];
      const content = _this.$refs["Content"];

      _this.scroller = new Scroller(component, content, {
        itemHeight: _this.itemHeight,
        onSelect(value, index) {
          _this.currentIndex = index;
          console.log("查看index:", index);
          _this.cloumn.forEach((element, index) => {
            if ("" + element.id === "" + value) {
              _this.currentValue = element;
              console.log(JSON.stringify(element, null, 2));
            }
          });

          console.log(value);
        },
        callback(top, isDragging) {
          content.style.webkitTransform = "translate3d(0, " + -top + "px, 0)";
        }
      });

      const len = _this.cloumn.length;

      _this.scroller.setDimensions(
        7 * _this.itemHeight,
        len * _this.itemHeight,
        len
      );
      _this.scroller.select(0, false);

      //   _this.setValue();
    },

    sureMethod() {
      //   let value = "";
      //   this.currentValue = value;
      this.$emit("pickerConfirm", this.currentValue);
      this.close();
    },

    open(parmas) {
      //   if (this.readonly) return;
      this.pickerShow = true;
      setTimeout(() => {
        if (parmas && parmas.name) {
          console.log("存在");
          this.currentValue = parmas;
          this.scroller.select(parmas.id, false);

          this.cloumn.forEach((ele, index) => {
            if (+ele.id === +parmas.id) {
              this.currentIndex = index;
              console.log(index);
            }
          });
        } else {
          this.currentIndex = 0;
          this.currentValue = this.cloumn[0];
          this.scroller.select(0, false);
        }

        this.show = true;
        isIOS && pageScroll.lock();
      }, 0);
     
    },
    close(e) {
      let that = this;
      this.show = false;
      isIOS && pageScroll.unlock();
    },
  }
};
</script>

<style lang="less">
@import "./picker.less";
.layer-mask {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  z-index: 1500;
  justify-content: center;
  align-items: center;
  // pointer-events: none;
  transition: opacity 0.2s ease-in;
  //   opacity: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>