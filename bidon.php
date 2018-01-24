<?php

if(isset($_POST['option'])){
	$option = $_POST['option'];

	try {
		if($option == 'option4'){
			$tab = array('resultat' => true);
		}else{
			$tab = array('resultat' => false);
		}
		echo json_encode($tab);
	} catch (Throwable $e) {
   		echo json_encode(array('resultat' => false));
	}
}
