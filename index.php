<!DOCTYPE html>
<html>
	<head>
		<title>JQuery animation example</title>
		<script src="jsanimator/jquery-1.7.min.js" language="javascript"></script>
		<script src="jsanimator/jsanimator.1.6.1.js" language="javascript"></script>
		<script language="javascript">
			var story = null;
			$(document).ready(function(){
				story = new Scene(16000,1000);
				// Add object 1 to storyboard
				story.addObject("#object1");
				
				// add event
				story.addEvent("#object1", {
					'left': '320'
				},3,10);
				story.play();
			});
		</script>
	</head>
	<body>
		<div id="object1" style="position:absolute">Test</div>
		
	</body>
</html>