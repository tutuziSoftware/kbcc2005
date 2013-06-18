function test($scope, $timeout){
	$scope.timelines = [
		new kbcc2005.Timeline([
			new kbcc2005.Pop(3),
			new kbcc2005.Pop(10),
			new kbcc2005.Pop(18),
			new kbcc2005.Pop(25)
		]),
		new kbcc2005.Timeline([
			new kbcc2005.Pop(4),
			new kbcc2005.Pop(11),
			new kbcc2005.Pop(19),
			new kbcc2005.Pop(26)
		]),
		new kbcc2005.Timeline([
			new kbcc2005.Pop(6),
			new kbcc2005.Pop(14),
			new kbcc2005.Pop(21),
			new kbcc2005.Pop(29)
		]),
		new kbcc2005.Timeline([
			new kbcc2005.Pop(7),
			new kbcc2005.Pop(15),
			new kbcc2005.Pop(22),
			new kbcc2005.Pop(30)
		])
	];
	$scope.good = 0;
	$scope.bad = 0;

	//Q, W, E, R
	var keyCodes = [81, 87, 69, 82];
	$scope.keys = keyCodes.map(function(keyCode){
		return String.fromCharCode(keyCode);
	});

	$("body").keydown(function(e){
		for(var i = 0 ; i != keyCodes.length ; i++){
			if(keyCodes[i] === e.keyCode){
				console.log(keyCodes[i]);
				$scope.timelines[i].fire();

				$scope.good = $scope.timelines.reduce(count.bind(null, "good"), 0);
				$scope.bad = $scope.timelines.reduce(count.bind(null, "bad"), 0);

				$scope.$apply();
				return;
			}
		}
	});

	$scope.start = function(){
		//タイムラインを動かします
		$timeout(function(){
			if($scope.timelines.every(checkTimelineEndAll)) return;

			$scope.timelines.forEach(function(timeline){
				timeline.movePops();
			});

			$timeout(arguments.callee, 1000);
		}, 1000);
	};



	//good、badを集計します
	function count(key, count, timeline){
		count += timeline[key];
		return count;
	}

	function checkTimelineEndAll(timeline){
		return timeline.isEnd;
	}
}