<?php 
	require_once("./config/Config.php");
	require_once("./models/OTP.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);
    $send = new SendEmail($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim(($_REQUEST['request']), '/'));
	} else {
		$req = array("errorcatcher");
	}
	$d = json_decode(base64_decode(file_get_contents("php://input")));
	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch($req[0]) {

				case 'login':
					echo json_encode($auth->login($d));
				break;

				case 'send':
					echo json_encode($send->send_email($d), JSON_PRETTY_PRINT);
				break;

				case 'loginbarbers':
					echo json_encode($auth->loginbarbers($d));
				break;
				
				case 'signup':
					echo json_encode($auth->signup($d));
				break;

				case 'getBarbers':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_barbers', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_barbers', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'getUsers':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_users', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_users', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'getSchedules':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_schedules', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_schedules', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'addSchedule':
					echo json_encode($gm->insert('tbl_schedules', $d));
				break;

				case 'addReviews':
					echo json_encode($gm->insert('tbl_reviews', $d));
				break;

				case 'selectScheduleJoin':
					if(count($req)>1){
						echo json_encode($get->selectScheduleJoin("tbl_users", $req[1]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectScheduleJoin("tbl_users", null), JSON_PRETTY_PRINT);
                    }
				break;

				case 'selectBarbersScheduleJoin':
					if(count($req)>1){
						echo json_encode($get->selectBarbersScheduleJoin("tbl_barbers", $req[1]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectBarbersScheduleJoin("tbl_barbers", null), JSON_PRETTY_PRINT);
                    }
				break;

				case 'selectBarbersScheduleJoinStatus2':
					if(count($req)>1){
						echo json_encode($get->selectBarbersScheduleJoinStatus2("tbl_barbers", $req[1], $req[2], $req[3]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectBarbersScheduleJoinStatus2("tbl_barbers", null), JSON_PRETTY_PRINT);
                    }
				break;

				case 'selectBarbersScheduleJoinStatus':
					if(count($req)>1){
						echo json_encode($get->selectBarbersScheduleJoinStatus("tbl_barbers", $req[1], $req[2]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectBarbersScheduleJoinStatus("tbl_barbers", null), JSON_PRETTY_PRINT);
                    }
				break;
				
				case 'selectUsersScheduleJoinStatus':
					if(count($req)>1){
						echo json_encode($get->selectUsersScheduleJoinStatus("tbl_users", $req[1], $req[2]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectUsersScheduleJoinStatus("tbl_users", null), JSON_PRETTY_PRINT);
                    }
				break;
				
				case 'selectUsersScheduleJoinStatusExtra':
					if(count($req)>1){
						echo json_encode($get->selectUsersScheduleJoinStatusExtra("tbl_schedules", $req[1], $req[2], $req[3]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectUsersScheduleJoinStatusExtra("tbl_schedules", null), JSON_PRETTY_PRINT);
                    }
				break;

				case 'selectBarbersSchedulesJoin':
					if(count($req)>1){
						echo json_encode($get->selectBarbersSchedulesJoin("tbl_barbers", $req[1]), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($get->selectBarbersSchedulesJoin("tbl_barbers", null), JSON_PRETTY_PRINT);
                    }
				break;

				case 'updateSchedulesStatus':
					echo json_encode($gm->update("tbl_schedules", $d, "schedules_id=$req[1]"));
				break;
				
				
				



				case 'updatePassword':
					echo json_encode($auth->updatePassword($d));
				break;

				case 'addCarRental':
					echo json_encode($gm->insert('tbl_rental', $d));
				break;


				case 'storeDesc':
					if(count($req)>1){
						echo json_encode($post->storeDescription('tbl_rental', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($post->storeDescription('tbl_rental', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'updateCarRental':
					echo json_encode($gm->update('tbl_rental', $d," rent_id = $req[1]"));
				break;

				case 'deleteCarRental':
					echo json_encode($gm->update('tbl_rental', $d," rent_id = $req[1]"));
				break;
				

				

				case 'pullCar':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_car', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_car', null),JSON_PRETTY_PRINT);
					}
				break;

				case 'updateCar':
					echo json_encode($gm->update('tbl_car', $d," car_id = $req[1]"));
				break;

				case 'deleteCar':
					echo json_encode($gm->update('tbl_car', $d," car_id = $req[1]"));
				break;

				case 'pullUser':
					if(count($req)>1){
						echo json_encode($gm->exec_query('tbl_user', $req[1]),JSON_PRETTY_PRINT);
					} else {
						echo json_encode($gm->exec_query('tbl_user', null),JSON_PRETTY_PRINT);
					}
				break;

				// SELECTED USER (PROFILE)
                case 'filterUser':
                    echo json_encode($gm->exec_query("tbl_user", $req[1]), JSON_PRETTY_PRINT);
                break;

				case 'updateUser':
					echo json_encode($gm->update('tbl_user', $d," user_id = $req[1]"));
				break;

				case 'rentalsjoin':
                    if(count($req)>1){
						echo json_encode($post->selectCarJoin("tbl_car", "tbl_car.rent_id=$req[1]"), JSON_PRETTY_PRINT);
					} else {
                        echo json_encode($post->selectCarJoin("tbl_car", null), JSON_PRETTY_PRINT);
                    }
				break;
   
				case 'pullRentals':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullRentals($d), JSON_PRETTY_PRINT);    
				break;

				case 'pullBrands':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullBrands($d), JSON_PRETTY_PRINT);    

				break;

				case 'pullByBrand':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($get->pullByBrand("tbl_car" , $d), JSON_PRETTY_PRINT);    

				break;

				default:
					http_response_code(400);
					echo "Invalid Route!";
				break;

			}
		break;


		case 'GET':
			switch ($req[0]) {
				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
			break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>