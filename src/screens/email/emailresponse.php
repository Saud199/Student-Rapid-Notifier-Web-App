<?php
	if (isset($_REQUEST['response'])) {
		$res = $_REQUEST['response'];
		if ($res == 1) {
			echo "Email sent successfully";
		}
		else {
			echo "There is a problem in sending email.";
		}
	}
	else {
		echo "Some thing went wrong.";
	}
?>