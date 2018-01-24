<?php

if(isset($_POST['mdp'])){
	$mdp = $_POST['mdp'];

	try {
		if($mdp == 'donald'){
			$tab = array('resultat' => true);
		}else{
			$tab = array('resultat' => false);
		}
		echo json_encode($tab);
	} catch (Throwable $e) {
   		echo json_encode(array('resultat' => false));
	}
}
