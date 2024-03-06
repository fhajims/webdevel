<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Thank you for registration</title>
    </head>
    <body>


<!-- 
    WARNING:
    This is minimal demo code to show how HMTL forms work.
    This file includes rather dangrous PHP code without any input validation.
  
    Minimal PHP infos:
      
    $_POST['name'] ... for data posted to the server (sent as key=value, e.g.: name=Nina)
      
-->

<?php 
	if (!empty($_POST)){ 
?>

    <h2>Hi <?php echo $_POST['name'];?>, thank you for registering at Green Camp workshop</h2>

    We already checked out your website at <?php echo $_POST['website'];?>.<br/>

    <a href="./code_351_forms_yaka-registration-form.html">Feel free to register another person.</a>


<!-- START -- remove this part later -->
<hr />
<h3>Debug info:</h3>
<ol>
<?php 
		foreach($_POST as $key => $value){
			echo '<li> Field "' . $key . '" was sent with value "' . $value . '"</li>';
		}
?>
</ol>
<hr />
<!-- END -- remove this part later -->

<?php 
	}else{ 
?>
	
	Some information is missing, please <a href="./code_351_forms_yaka-registration-form.html">register again</a>!

<?php
	} 
?>

    </body>
</html>