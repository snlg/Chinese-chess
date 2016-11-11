/**
 * Created by 西爽 on 16-11-9.
 */
!function(){
    var boxObj = document.getElementById('box');
    var liObj = boxObj.getElementsByClassName('lili');
    var horseObj = boxObj.getElementsByClassName('horse');
    var fireObj = boxObj.getElementsByClassName('fire');
    var elephantObj = boxObj.getElementsByClassName('elephant');
    var carObj = boxObj.getElementsByClassName('car');
    var soldierObj = boxObj.getElementsByClassName('soldier');
    var scholarObj = boxObj.getElementsByClassName('scholar');
    var kingObj = boxObj.getElementsByClassName('king');
    var flashObj = document.getElementsByClassName('flash');
    var oldPosX,oldPosY;
    var topPos= [[0,'car'],[1,'horse'],[2,'elephant'],[3,'scholar'],[4,'king'],[5,'scholar'],[6,'elephant'],[7,'horse'],[8,'car'],[19,'fire'],[25,'fire'],[27,'soldier'],[29,'soldier'],[31,'soldier'],[33,'soldier'],[35,'soldier']];
    var Sudoku=new Array(3,4,5,12,13,14,21,22,23);
    var flag=0;
    var count=1;
    function hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    }
    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        }
    }
    function removeClass(ele,cls) {
        if (hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }
    function move(x,y,j){
        for(var s = 0; s < liObj.length; s++) {
            var qiObj = liObj[s].getElementsByTagName('div');
            if(hasClass(qiObj[qiObj.length-1],'flash')){
                //马的走法;
                if(hasClass(flashObj[0],'horse')){
                    return horseF(x,y,j);
                }
                //炮的走法;
                if(hasClass(flashObj[0],'fire')){
                    return fireF(x,y,j);
                }
                //象的走法；
                if(hasClass(flashObj[0],'elephant')){
                    return elephantF(x,y,j);
                }
                //车的走法；
                if(hasClass(flashObj[0],'car')){
                    return carF(x,y,j);
                }
                //兵的走法
                if(hasClass(flashObj[0],'soldier')){
                    return soldierF(x,y,j);
                }
                //将的走法
                if(hasClass(flashObj[0],'king')){
                    return kingF(x,y,j);
                }
                //士的走法
                if(hasClass(flashObj[0],'scholar')){
                    return scholarF(x,y,j);
                }
            }
        };
    }
    function Todo (Obj,j){
        //alert(1);
        for(var fHorse=0;fHorse<Obj.length;fHorse++){
            if(hasClass(Obj[fHorse],'flash')){
                break;
            }
        }
        //alert(fHorse);
        var cssum =liObj[j].children;
        //console.log(cssum.length);
        if(cssum.length>2){
            //console.log(liObj[j].children);
            liObj[j].appendChild(Obj[fHorse]);
            liObj[j].removeChild(liObj[j].children[2]);
            removeClass(flashObj[0],'flash');
            if((kingObj.length<2)){
                if(count%2){
                    alert('红色赢')
                }
                else{
                    alert('蓝色赢')
                }
            }
        }
        else{
            liObj[j].appendChild(Obj[fHorse]);
            removeClass(flashObj[0],'flash');
            if((kingObj.length<2)){
                if(count%2){
                    alert('红色赢')
                }
                else{
                    alert('蓝色赢')
                }
            }
        }
        return count +=1;
    }
    function horseF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        if(
            ((x == oldPosX+2 && y==oldPosY-1)&&(liObj[oldPos+1].children.length<3))||
            ((x == oldPosX+2 && y==oldPosY+1)&&(liObj[oldPos+1].children.length<3))||
            ((x == oldPosX-2 && y==oldPosY-1)&&(liObj[oldPos-1].children.length<3))||
            ((x == oldPosX-2 && y==oldPosY+1)&&(liObj[oldPos-1].children.length<3))||
            ((x == oldPosX-1 && y==oldPosY+2)&&(liObj[oldPos+9].children.length<3))||
            ((x == oldPosX+1 && y==oldPosY+2)&&(liObj[oldPos+9].children.length<3))||
            ((x == oldPosX-1 && y==oldPosY-2)&&(liObj[oldPos-9].children.length<3))||
            ((x == oldPosX+1 && y==oldPosY-2)&&(liObj[oldPos-9].children.length<3)))
        {
            Todo(horseObj,j)
        }
        else{
            removeClass(flashObj[0],'flash');
        }
    }
    function fireF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        //alert(1);
        var chessPieces = liObj[j].getElementsByTagName('div')[2];//选择位置的棋子div
        var ziObj = liObj[j].getElementsByTagName('div');//点击位置的div数组
        for(var ffire=0;ffire<fireObj.length;ffire++){
            if(hasClass(fireObj[ffire],'flash')){
                //alert(1);
                //alert(liObj[70].getElementsByTagName('div').length);
                if(ziObj.length>2){
                    if((kingObj.length<2)){
                        if(count%2){
                            alert('红色赢')
                        }
                        else{
                            alert('蓝色赢')
                        }
                    }
                    //点击下去有棋子。
                    if(Math.abs(oldPos-j)%9==0){
                        //竖着走,判断中间有且只有一颗棋子
                        var paoMid=0;
                        var pmargin=(j-oldPos)/9;
                        for (var kpshu=0;kpshu<Math.abs(pmargin);kpshu++){
                            if(liObj[oldPos+9*(kpshu+1)*pmargin/Math.abs(pmargin)].getElementsByTagName('div').length>2){
                                paoMid+=1;
                            }
                        }
                        if(paoMid==2){
                            Todo(fireObj,j)
                        }
                    }else if(Math.abs(oldPos-j)<9){
                        var pmargin=j-oldPos;
                        var paoMid=0;
                        for (var kpshu=1;kpshu<Math.abs(pmargin);kpshu++){
                            if(liObj[oldPos+kpshu*pmargin/Math.abs(pmargin)].getElementsByTagName('div').length>2){
                                paoMid+=1;
                            }
                        }
                        if(paoMid==1){
                            Todo(fireObj,j)
                        }
                    }
                }
                else{
                    if((kingObj.length<2)){
                        if(count%2){
                            alert('红色赢')
                        }
                        else{
                            alert('蓝色赢')
                        }
                    }
                    //点下去没有棋子，要判断中间不包括任何棋子
                    if(Math.abs(oldPos-j)%9==0){
                        //竖着走
                        //alert(Math.abs(oldPos-j)/9);
                        var pmargin=(j-oldPos)/9;
                        //竖着中间隔着多少数字
                        for (var kpshu=0;kpshu<Math.abs(pmargin);kpshu++){
                            // alert(1);
                            if(liObj[oldPos+9*(kpshu+1)*pmargin/Math.abs(pmargin)].getElementsByTagName('div').length>2){
                                return false;
                            }
                        }
                        liObj[j].appendChild(fireObj[ffire]);
                        removeClass(flashObj[0],'flash');
                        count+=1;//炮这边有个坑 第70个位置进来的话  会到有棋子的判断里面
                    }
                    else if(Math.abs(oldPos-j)<9){
                        //横着走
                        var pmargin=j-oldPos;
                        for (var kpshu=1;kpshu<Math.abs(pmargin);kpshu++){
                            if(liObj[oldPos+kpshu*pmargin/Math.abs(pmargin)].getElementsByTagName('div').length>2){
                                return false;
                            }
                        }
                        liObj[j].appendChild(fireObj[ffire]);
                        removeClass(flashObj[0],'flash');
                        count+=1;//炮这边有个坑 第70个位置进来的话  会到有棋子的判断里面
                    }
                }
            }
        }
    }
    function elephantF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        //alert(oldPos)
        if((oldPos<44&&j<44)||(oldPos>44&&j>44)){
            if(
                ((x == oldPosX+2 && y==oldPosY+2)&&(liObj[oldPos+10].children.length<3))||
                ((x == oldPosX+2 && y==oldPosY-2)&&(liObj[oldPos-8].children.length<3))||
                ((x == oldPosX-2 && y==oldPosY+2)&&(liObj[oldPos+8].children.length<3))||
                ((x == oldPosX-2 && y==oldPosY-2)&&(liObj[oldPos-10].children.length<3)))
            {
                Todo(elephantObj,j)
            }
            else{
                removeClass(flashObj[0],'flash');
            }
        }
        else{
            removeClass(flashObj[0],'flash');
            alert('此象不能过河')
        }
    }
    function carF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        if(Math.abs(oldPos-j)%9==0){
            //shuzhezou
            var pmargin=(j-oldPos)/9;
            for (var kpshu=0;kpshu<Math.abs(pmargin)-1;kpshu++){
                // alert(1);
                if(liObj[oldPos+9*(kpshu+1)*pmargin/Math.abs(pmargin)].getElementsByTagName('div').length>2){
                    return false;
                }
            }
            Todo(carObj,j)
        }
        else if(Math.abs(oldPos-j)<9) {
            //横着走
            var pmargin = j - oldPos;
            for (var kpshu = 1; kpshu < Math.abs(pmargin); kpshu++) {
                if (liObj[oldPos + kpshu * pmargin / Math.abs(pmargin)].getElementsByTagName('div').length > 2) {
                    return false;
                }
            }
            Todo(carObj,j)
        }
    }
    function soldierF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        //alert(oldPos)
        if(oldPos<45){
            //红色方
            //console.log(j,oldPos);
            //alert(count);
            if(count%2==0){
                //已经过河的蓝色方
                if((j == oldPos-9)||(j == oldPos+1)||(j == oldPos-1)){
                    Todo(soldierObj,j)
                }
            }
            else{
                //红色在红色这边(兵还没有过河)
                if(j == oldPos+9) {
                    //alert(1);
                    Todo(soldierObj,j)
                }
                else{
                    removeClass(flashObj[0],'flash');
                }
            }
        }
        if(oldPos>44){
            if(count%2==1){
                if((j == oldPos+9)||(j == oldPos+1)||(j == oldPos-1)){
                    Todo(soldierObj,j)
                }
            }
            else{
                if(j == oldPos-9) {
                    Todo(soldierObj,j)
                }
                else{
                    removeClass(flashObj[0],'flash');
                }
            }
        }
    }
    function kingF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        if(oldPos<45){
            //红色方九宫格
            for(var i in Sudoku){
                //console.log(Sudoku[i]);
                if(j==Sudoku[i]){
                    Todo(kingObj,j)
                }
            }
        }
        if(oldPos>45){
            //红色方九宫格
            for(var i in Sudoku){
                var Sudokut=new Array;
                //console.log(Sudoku[i]);
                Sudokut.push(89-Sudoku[i]);
                //console.log(Sudokut)
                for(var c in Sudokut){
                    if(j==Sudokut[c]){
                        Todo(kingObj,j)
                    }
                }

            }
        }
    }
    function scholarF(x,y,j){
        var oldPos=oldPosX+oldPosY*9;
        if(oldPos<45){
            //红色方九宫格
            for(var i in Sudoku){
                //console.log(Sudoku[i]);
                if(j==Sudoku[i]){
                    if(
                        ((x == oldPosX+1 && y==oldPosY-1))||
                        ((x == oldPosX+1 && y==oldPosY+1))||
                        ((x == oldPosX-1 && y==oldPosY-1))||
                        ((x == oldPosX-1 && y==oldPosY+1)))
                    {
                        Todo(scholarObj,j)
                    }
                }
            }
        }
        if(oldPos>45){
            //红色方九宫格
            for(var i in Sudoku){
                var Sudokut=new Array;
                //console.log(Sudoku[i]);
                Sudokut.push(89-Sudoku[i]);
                //console.log(Sudokut)
                for(var c in Sudokut){
                    if(j==Sudokut[c]){
                        if(
                            ((x == oldPosX+1 && y==oldPosY-1))||
                            ((x == oldPosX+1 && y==oldPosY+1))||
                            ((x == oldPosX-1 && y==oldPosY-1))||
                            ((x == oldPosX-1 && y==oldPosY+1)))
                        {
                            Todo(scholarObj,j)
                        }
                    }
                }

            }
        }
    }
    var map = {
        //入口
        init : function(){
            var self=this;
            self.bindEvt();
        },
        //创建棋盘
        bindEvt : function(){
            var self=this;
            for(var i=0; i<90; i++){//创建棋谱
                boxObj.innerHTML +=" <li class='lili'> <div class='line'></div> <div class='list'></div> </li>"
            }
            //创建中间部分(上半部分)
            for(var midt=37;midt<44;midt++){
                var listObj = liObj[midt].getElementsByClassName('list')[0];
                //console.log(listObj);
                listObj.setAttribute("style","height:50%");
            }
            //创建中间部分(下半部分)
            for(var midb=46;midb<53;midb++){
                var listObj = liObj[midb].getElementsByClassName('list')[0];
                listObj.setAttribute("style","height:50%;top:50%");
            }
            //创建四周
            for(var sleft=0;sleft<9;sleft++){
                liObj[sleft].getElementsByClassName('list')[0].setAttribute("style","height:50%;top:50%");
                liObj[89-sleft].getElementsByClassName('list')[0].setAttribute("style","height:50%;");
                liObj[sleft*9].getElementsByClassName('line')[0].setAttribute("style","width:50%;left:50%");
                liObj[(sleft+1)*9-1].getElementsByClassName('line')[0].setAttribute("style","width:50%;");
                liObj[liObj.length-1].getElementsByClassName('line')[0].setAttribute("style","width:50%;");
                liObj[liObj.length-9].getElementsByClassName('line')[0].setAttribute("style","width:50%;left:50%");
            }
            self.starGame();
            self.getPos();
        },
        //布置棋子初始位置 并且作为游戏的开始
        starGame : function(){
            function addPos(pos,name,paly){
                liObj[pos].innerHTML +="<div class="+"'"+name+" "+paly+"'"+"></div>";
            }
            //console.log(topPos[1][0],topPos[1][1]);
            for(var posnum=0;posnum<topPos.length;posnum++){
                addPos(topPos[posnum][0],topPos[posnum][1],'playR');
                addPos(89-(topPos[posnum][0]),topPos[posnum][1],'playB');
            }
            //给各个棋子添加内容
            function addtext(ele,what){
                var eleObj = boxObj.getElementsByClassName(ele);
                //console.log(eleObj);
                for (var kk=0; kk<eleObj.length;kk++){
                    eleObj[kk].innerHTML = what;
                }
            };
            addtext('horse',"馬");
            addtext('car',"车");
            addtext('elephant',"象");
            addtext('soldier',"兵");
            addtext('fire',"炮");
            addtext('king',"将");
            addtext('scholar',"士");
        },
        //点击后获得对应位置
        getPos : function(){
            var self=this;
            for (var i = 0; i < liObj.length; i++) {
                (function(j){
                    liObj[j].addEventListener("click", function(e) {
                        //化成坐标;
                        var x = j%9;
                        var y = parseInt(j/9);
                        //console.log(count);
                        //console.log(j);
                        var chessPieces = liObj[j].getElementsByTagName('div')[2];//选择位置的棋子div
                        var ziObj = liObj[j].getElementsByTagName('div');//点击位置的div数组
                        // tro j:点击的位置，
                        if(count%2&&(ziObj.length>2)){
                            //奇数步并且有棋子(红方走)
                            if(hasClass(ziObj[ziObj.length-1],'playR')){
                                if(flashObj.length>0){
                                    //若棋盘已经有闪动的棋子
                                    removeClass(flashObj[0],'flash');
                                    addClass(chessPieces,'flash');
                                    return oldPosX = x,oldPosY = y,flag=1;
                                }
                                else{
                                    addClass(chessPieces,'flash');
                                    return oldPosX = x,oldPosY = y,flag=1;
                                }
                            }
                        }
                        if((count%2==0)&&(ziObj.length>2)){
                            //偶数步并且有棋子(蓝方走)
                            if(hasClass(ziObj[ziObj.length-1],'playB')){
                                if(flashObj.length>0){
                                    //若棋盘已经有闪动的棋子
                                    removeClass(flashObj[0],'flash');
                                    addClass(chessPieces,'flash');
                                    return oldPosX = x,oldPosY = y,flag=0;
                                }
                                else{
                                    addClass(chessPieces,'flash');
                                    return oldPosX = x,oldPosY = y,flag=0;
                                }
                            }
                        }
                        if(flag){
                            if(flashObj.length>0){
                                if(count%2&&(ziObj.length=2)){
                                    move(x,y,j);
                                }
                            }
                        }
                        if(!flag){
                            if(flashObj.length>0){
                                if((count%2==0)&&(ziObj.length=2)){
                                    move(x,y,j);
                                }
                            }
                        }
                    }, false);
                })(i) ;
            }
        }
    };
    map.init();
}();