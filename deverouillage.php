<?php

if(isset($_POST['code'])){
	$code = $_POST['code'];

	try {
		eval($code);
		$uneVariable = deverouillage();
		if($uneVariable == 'ACDC'){
			$tab = array('resultat' => true);
		}else{
			$tab = array('resultat' => false);
		}
		echo json_encode($tab);
	} catch (Throwable $e) {
   		echo json_encode(array('resultat' => false));
	}
}

/*
function deverouillage(){
	$codecrypt="c4b0318bd5d514c92276e5cb55ce15359ce66579"; // A donner dans l'enoncé de l'énigme
	$tabdequatrelettre=array('a','b','c','d','A','B','C','D');
	foreach ($tabdequatrelettre as $value) {
		foreach ($tabdequatrelettre as $value1) {
			foreach ($tabdequatrelettre as $value2) {
				foreach ($tabdequatrelettre as $value3) {
					$mdp= $value . $value1 . $value2 . $value3;
					$mdpcryptEnSha=sha1($mdp);
					if($mdpcryptEnSha == $codecrypt){
						return $mdp;
					}
				}
			}
		}
	}
}
*/
