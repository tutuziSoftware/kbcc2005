function test($scope, $timeout){
	$scope.keyQ = new kbcc2005.Timeline([
		new kbcc2005.Pop(5),
		new kbcc2005.Pop(10),
		new kbcc2005.Pop(15)
	]);
	$scope.keyW = new kbcc2005.Timeline([
		new kbcc2005.Pop(6),
		new kbcc2005.Pop(11),
		new kbcc2005.Pop(16)
	]);
	$scope.keyE = new kbcc2005.Timeline([
		new kbcc2005.Pop(7),
		new kbcc2005.Pop(12),
		new kbcc2005.Pop(17)
	]);

	var Q = 81;
	var W = 97;
	var E = 69;

	$("body").keydown(function(e){
		switch(e.keyCode){
			case Q:
				$scope.keyQ.fire();
				break;
			case W:
				$scope.keyW.fire();
				break;
			case E:
				$scope.keyE.fire();
				break;
		}
	});

	$timeout(function(){
		if($scope.keyE.isEnd) return;

		$scope.keyQ.movePops();
		$scope.keyW.movePops();
		$scope.keyE.movePops();

		$timeout(arguments.callee, 500);
	}, 1000);
}