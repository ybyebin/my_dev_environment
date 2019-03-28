import './style/index.less';
import 'common/style/loading.less';
import './'
// import lxn from 'common/js/lxn.js';
import {setRemFont,loadJs} from '../common/js/utils'

setRemFont()

window.onload = function(){
    // alert(1)
    loadJs()
    ;
    console.log(loadingShow)
}

