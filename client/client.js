function test($scope, $timeout){
	$scope.pops = [
		{
			key:'Q',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(3),
				new kbcc2005.Pop(10),
				new kbcc2005.Pop(18),
				new kbcc2005.Pop(25)
			])
		},
		{
			key:'W',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(4),
				new kbcc2005.Pop(11),
				new kbcc2005.Pop(19),
				new kbcc2005.Pop(26)
			])
		},
		{
			key:'E',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(7),
				new kbcc2005.Pop(14),
				new kbcc2005.Pop(21),
				new kbcc2005.Pop(29)
			])
		},
		{
			key:'R',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(8),
				new kbcc2005.Pop(15),
				new kbcc2005.Pop(22),
				new kbcc2005.Pop(30)
			])
		}
	];
	$scope.good = 0;
	$scope.bad = 0;

	$("body").keydown(function(e){
		for(var i = 0 ; i != $scope.pops.length ; i++){
			if($scope.pops[i].key.charCodeAt(0) === e.keyCode){
				$scope.pops[i].timeline.fire();

				$scope.good = $scope.pops.reduce(count.bind(null, "good"), 0);
				$scope.bad = $scope.pops.reduce(count.bind(null, "bad"), 0);

				$scope.$apply();
				return;
			}
		}
	});

	$scope.start = function(){
		//タイムラインを動かします
		$timeout(function(){
			if($scope.pops.every(checkTimelineEndAll)) return;

			$scope.pops.forEach(function(timeline){
				timeline.timeline.movePops();
			});

			$timeout(arguments.callee, 1000);
		}, 1000);
	};



	//good、badを集計します
	function count(key, count, pop){
		count += pop.timeline[key];
		return count;
	}

	function checkTimelineEndAll(pop){
		return pop.timeline.isEnd;
	}
}