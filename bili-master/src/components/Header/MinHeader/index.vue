<template>
  <div class="min-header" :style="{...minHeaderStyle}" ref="minHeader">
    <NavLink :color="minHeader.color" :hoverColor="minHeader.hoverColor"></NavLink>
    <NavSearch></NavSearch>
    <NavUserCenter :color="minHeader.color" :hoverColor="minHeader.hoverColor"></NavUserCenter>
  </div>
</template>

<script>

import NavLink from './NavLink'
import NavSearch from './NavSearch';
import NavUserCenter from './NavUserCenter';

export default {
    name: 'Header',
    components:{
      NavLink,
      NavSearch,
      NavUserCenter
    },
    props:{
      bgColor:{
        type: String,
        default: 'transparent'
      },
      bgChangeColor: {
        type: String,
        default: 'white'
      },
      position: {
        type: String,
        default: 'fixed'
      },
      boxShadowOpa:{
        type: String,
        default: '0.1'
      },
      color: {
        type: String,
        default: 'white'
      },
      hoverColor :{
        type: String,
        default: '#fb7299'
      },
      bgChange: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        minHeaderStyle:{ 
          '--min-header-bg-color': this.bgColor,
          '--min-header-bg-position': this.position,
          '--min-header-bg-box-shadow-opa': this.bgChange ? '0' : this.boxShadowOpa  
        },
        minHeader:{
          color: this.color,
          hoverColor: this.hoverColor
        }
      }
    },
    watch:{
      color(val){
        this.minHeader.color = val
      },
      hoverColor(val){
         this.minHeader.hoverColor = val
      }
    },
    methods:{
      minHeaderStyleGradualChange(){
        if(this.bgChange){
          let change = false
          const top = this.$refs.minHeader.parentElement.offsetHeight - this.$refs.minHeader.offsetHeight
          this.gradualChangeHandler = () => {
            const currentScrollTop = document.documentElement.scrollTop
            if (!change && currentScrollTop >= top) {
              this.minHeaderStyle['--min-header-bg-color'] = this.bgChangeColor
              this.minHeaderStyle['--min-header-bg-box-shadow-opa'] = this.boxShadowOpa
              this.minHeader.color = '#18191c'
              this.minHeader.hoverColor = '#02b5da'
              change = 1
            } else if (change && currentScrollTop < top) {
              this.minHeaderStyle['--min-header-bg-color'] = this.bgColor
              this.minHeaderStyle['--min-header-bg-box-shadow-opa'] = '0'
              this.minHeader.color = this.color
              this.minHeader.hoverColor = this.hoverColor
              change = 0
            }
          }
          window.addEventListener('scroll', this.gradualChangeHandler)
        }
      }
    },
    mounted(){
      this.minHeaderStyleGradualChange()
    },
    beforeDestroy(){
      this.gradualChangeHandler && window.removeEventListener('scroll', this.gradualChangeHandler)
    }
}
</script>

<style scoped>
    .min-header{
        height: var(--min-header-top);
        width: 100%;
        box-sizing: border-box;
        padding: 10px 24px;
        display: flex;
        /* align-items: center; */
        justify-content: space-between;
        /* position: fixed; */
        top: 0;
        left: 0;
        z-index: 88;
        transition: .5s;
        
        --min-header-bg-color: transparent;
        --min-header-bg-position: fixed;
        --min-header-bg-box-shadow-opa: 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, var(--min-header-bg-box-shadow-opa));
        background-color: var(--min-header-bg-color);
        position: var(--min-header-bg-position);

        /* color: ; */
        
    }


</style>