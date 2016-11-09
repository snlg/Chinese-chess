/**
 * Created by 西爽 on 16-11-9.
 */

!function(){
    var boxObj = document.getElementById('box');
    var liObj = boxObj.getElementsByClassName('lili');
    var horseObj = boxObj.getElementsByClassName('horse');
    var oldPosX,oldPosY;
    function hasClass(elem, cls){
        cls = cls || '';
        if(cls.replace(/\s/g, '').length == 0) return false;
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    }
    function addClass(elem, cls){
        if(!hasClass(elem, cls)){
            elem.className += ' ' + cls;
        }
    }
    function removeClass(elem, cls) {
        if (hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
    function horseF(x,y,j){
        //console.log(x,y,oldPosX,oldPosY);
        //alert(x+'和'+y)
        if((x == oldPosX+2 && y==oldPosY-1)||(x == oldPosX+2 && y==oldPosY+1)||(x == oldPosX-2 && y==oldPosY-1)||(x == oldPosX-2 && y==oldPosY+1)||(x == oldPosX-1 && y==oldPosY+2)||(x == oldPosX+1 && y==oldPosY+2)||(x == oldPosX-1 && y==oldPosY-2)||(x == oldPosX+1 && y==oldPosY-2)){
            liObj[j].appendChild(horseObj[0]);
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
            var topPos= [[0,'car'],[1,'horse'],[2,'elephant'],[3,'scholar'],[4,'king'],[5,'scholar'],[6,'elephant'],[7,'horse'],[8,'car'],[19,'fire'],[25,'fire'],[27,'soldier'],[29,'soldier'],[31,'soldier'],[33,'soldier'],[35,'soldier']];
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
                        var chessPieces = liObj[j].getElementsByTagName('div')[2];
                        //化成坐标;
                        var x = j%9;
                        var y = parseInt(j/9);
                        console.log(j)
                        //判断当前点击处若没有被选中则选中并且添加闪烁
                        var ziObj = liObj[j].getElementsByTagName('div');
                        if(ziObj.length>2){
                            //子元素div个数大于2说明该位置有棋子
                            if(!liObj[j].getAttribute('data-status')){
                                //console.log(chessPieces);
                                chessPieces.setAttribute('data-status',"choose");
                                addClass(chessPieces,'flash');
                                //保存原来位置的XY
                                return oldPosX = x,oldPosY = y;
                            }
                        }
                        //第一次点击之后先去掉所有的choose;确保整个棋盘只有一个choose;
                        for(var s = 0; s < liObj.length; s++) {
                            var qiObj = liObj[s].getElementsByTagName('div');
                            if(qiObj[qiObj.length-1].getAttribute('data-status')){
                                //do 走棋；
                                horseF(x,y,j);
                                removeClass(liObj[j].getElementsByTagName('div')[2],'flash');
                            }
                        };
                        //return j;
                    }, false);
                })(i) ;
            }
        },
        rule : function(){
        }
    };
    map.init();
}();