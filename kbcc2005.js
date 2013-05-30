var kbcc2005 = {};

//一つの線。1つの線のポップくんを全て格納し、管理する
kbcc2005.Timeline = function(pops){
    this.pops = pops;
    this.count = 0;
    this.position = 0;
	this.good = 0;
	this.bad = 0;
	this.isEnd = false;
};

(function(){
    var tl = kbcc2005.Timeline.prototype;

    //ユーザーがボタンを押した時
    tl.fire = function(){
		if(this.pops[this.position].position == this.count){
			this.good++;
		}else{
			this.bad++;
		}
    };
    //タイムラインを1つ移動
    tl.movePops = function(){
		if(this.isEnd) return;

        this.count++;

		if(this.count > this.pops[this.position].position){
			this.position++;

			if(this.pops[this.position] === void 0) {
				this.isEnd = true;
				return;
			}
		}
    };
	tl.isFireTiming = function(){
		if(this.isEnd){
			return false;
		}

		return this.count === this.pops[this.position].position
	};
	//次のポップ君の位置
	tl.getOffset = function(){
		if(this.isEnd){
			return -1;
		}

		return this.pops[this.position].position - this.count;
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