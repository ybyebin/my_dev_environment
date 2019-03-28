import './style/index.less';
import 'common/style/reset.less';
import 'common/style/loading.less';
// import 'common/style/dialog.less';

// import lxn from 'common/js/lxn.js';
import {setRemFont,vsConsole,loadingShow,loadingHide} from '../common/js/utils'



window.onload = function(){
    setRemFont()

    vsConsole()
    loadingShow();
    setTimeout(()=>{
        loadingHide()
    },2000)
    
}

