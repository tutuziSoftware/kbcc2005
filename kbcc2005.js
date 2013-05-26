var kbcc2005 = {};

//一つの線。1つの線のポップくんを全て格納し、管理する
kbcc2005.Timeline = function(pops){
    this.pops = pops;
    this.count = 0;
    this.position = 0;
	this.good = 0;
	this.bad = 0;
};

(function(){
    var tl = kbcc2005.Timeline.prototype;

    //ユーザーがボタンを押した時
    tl.click = function(){
		if(this.pops[this.position].position == this.count){
			this.good++;
		}else{
			this.bad++;
		}
    };
    //タイムラインを1つ移動
    tl.movePops = function(){
        this.count++;

		if(this.count > this.pops[this.position].position){
			this.position++;
		}
    };

    tl = null;
})();

//ポップくん。定数
kbcc2005.Pop = function(position){
    this.position = position;
};

(function(){
    var pop = kbcc2005.Pop.prototype;
})();