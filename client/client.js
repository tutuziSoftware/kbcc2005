function test($scope, $timeout){
	$scope.pops = [
		{
			key:'Q',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(12),
				new kbcc2005.Pop(40),
				new kbcc2005.Pop(72),
				new kbcc2005.Pop(100)
			])
		},
		{
			key:'W',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(16),
				new kbcc2005.Pop(44),
				new kbcc2005.Pop(76),
				new kbcc2005.Pop(104)
			])
		},
		{
			key:'E',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(28),
				new kbcc2005.Pop(56),
				new kbcc2005.Pop(84),
				new kbcc2005.Pop(116)
			])
		},
		{
			key:'R',
			timeline:new kbcc2005.Timeline([
				new kbcc2005.Pop(32),
				new kbcc2005.Pop(60),
				new kbcc2005.Pop(88),
				new kbcc2005.Pop(120)
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

			$timeout(arguments.callee, 250);
		}, 250);
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