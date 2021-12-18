<?php
	class Auth {
		
		protected $gm, $pdo;
		private $status =array();
		private $data = array();
		private $token = array();

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->gm = new GlobalMethods($pdo);
		}

		function encryptPassword($pword): ?string {
			$hashFormat="$2y$10$";
			$saltLength=22;
			$salt=$this->generateSalt($saltLength);
			return crypt($pword, $hashFormat.$salt);
		}

		function generateSalt($len){
			$urs=md5(uniqid(mt_rand(), true));
			$b64String=base64_encode($urs);
			$mb64String=str_replace('+','.', $b64String);
			return substr($mb64String, 0, $len);
		}

		# JWT
		protected function generateHeader() {
			$h = [
				"typ"=>"JWT",
				"alg"=>"HS256",
				"app"=>"My App",
				"dev"=>"The Developer"
			];
			return str_replace("=", "", base64_encode(json_encode($h)));
		}

		protected function generatePayload($uc, $ue, $ito) {
			$p = [
				"uc"=>$uc,
				"ue"=>$ue,
				"ito"=>$ito,
				"iby"=>"The Developer",
				"ie"=>"thedeveloper@test.com",
				"exp"=>date("Y-m-d H:i:s") //date_create()
			];
			return str_replace("=", "", base64_encode(json_encode($p)));
		}

		protected function generateToken($usercode, $useremail, $fullname) {
			$header = $this->generateHeader();
			$payload = $this->generatePayload($usercode, $useremail, $fullname);
			$signature = hash_hmac("sha256", "$header.$payload", base64_encode(SECRET));
			return "$header.$payload." .str_replace("=", "", base64_encode($signature));
		}

		#./JWT

		// public function showToken($data){
		// 	$user_data = []; 
		// 	foreach ($data as $key => $value) {
		// 		array_push($user_data, $value);
		// 	}
		// 	return $this->generateToken($user_data[1], $user_data[2], $user_data[3]);
		// }

		public function showToken(){
			return $this->generateToken($user_data[0], $user_data[1], $user_data[2]);
		}

		// function login($dt){
			
		// 	$this->sql="SELECT * FROM tbl_user WHERE user_uname='$dt->user_uname' LIMIT 1";

		// 	try {
		// 		if ($res = $this->pdo->query($this->sql)->fetchColumn()>0) {
		// 			$result=$this->pdo->query($this->sql)->fetchAll();

		// 			$data = array(); $code = 0; $msg = ""; $remarks = "";
		// 			foreach ($result as $rec) { 
		// 				if($this->pwordCheck($dt->user_pword, $rec['user_pword'])){
		// 					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
		// 					$data = null;
		// 				} else{
		// 					$res = null; $code = 401; $msg = "Incorrect Password"; $remarks = "failed";
		// 				}
		// 			}
		// 		} else{
		// 			http_response_code(401);
		// 			$res = null; $code = 401; $msg = "User does not exist"; $remarks = "failed";
		// 		}
		// 	} catch (\PDOException $e) {
		// 		$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		// 	}
		// 	return $this->sendPayload(base64_encode(json_encode($data)), $remarks, $msg, $code);
		// }

		function login($dt){
			$users_username = $dt->users_username;
			$users_password = $dt->users_password;

			$sqlstr="SELECT * FROM tbl_users WHERE users_username='$users_username' LIMIT 1";    
			if($result=$this->pdo->query($sqlstr)){
				if($result->rowCount() > 0){
					$res=$result->fetch();
					if($this->pwordCheck($users_password, $res['users_password'])){
						http_response_code(200);
						$this->data = array(
							'users_username'=>$res['users_username'],
							'users_fname'=>$res['users_fname'],
							'users_lname'=>$res['users_lname'],          
							'users_id'=>$res['users_id']          
						);
						$this->token = $this->generateToken($res['users_username'], $res['users_fname'], $res['users_lname'], $res['users_id']);
						$this->status = array(
							'remarks'=>'success',
							'message'=>'successfully logged in'
						);
					} else {
						http_response_code(200);
						$this->status = array(
							'remarks'=>'failed',
							'message'=>'Incorrect username or password'
						);
					}

				} else {
					http_response_code(200);
					$this->status = array(
						'remarks'=>'failed',
						'message'=>'Incorrect username or password'

					);
				}
			} else {
				http_response_code(200);
				$this->status = array(
					'remarks'=>'failed',
					'message'=>'Incorrect username or password'

				);
			} 
			return array(
				'token'=>$this->token,
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Tracey Solis, Developer',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}
		
		function loginbarbers($dt){
			$barbers_username = $dt->barbers_username;
			$barbers_password = $dt->barbers_password;

			$sqlstr="SELECT * FROM tbl_barbers WHERE barbers_username='$barbers_username' LIMIT 1";    
			if($result=$this->pdo->query($sqlstr)){
				if($result->rowCount() > 0){
					$res=$result->fetch();
					if($this->pwordCheck($barbers_password, $res['barbers_password'])){
						http_response_code(200);
						$this->data = array(
							'barbers_username'=>$res['barbers_username'],
							'barbers_fname'=>$res['barbers_fname'],
							'barbers_lname'=>$res['barbers_lname'],          
							'barbers_id'=>$res['barbers_id']          
						);
						$this->token = $this->generateToken($res['barbers_username'], $res['barbers_fname'], $res['barbers_lname'], $res['barbers_id']);
						$this->status = array(
							'remarks'=>'success',
							'message'=>'successfully logged in'
						);
					} else {
						http_response_code(200);
						$this->status = array(
							'remarks'=>'failed',
							'message'=>'Incorrect username or password'
						);
					}

				} else {
					http_response_code(200);
					$this->status = array(
						'remarks'=>'failed',
						'message'=>'Incorrect username or password'

					);
				}
			} else {
				http_response_code(200);
				$this->status = array(
					'remarks'=>'failed',
					'message'=>'Incorrect username or password'

				);
			} 
			return array(
				'token'=>$this->token,
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'Tracey Solis, Developer',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}

		function signup($dt){
            $payload = $dt;
            $encryptedPassword = $this->encryptPassword($dt->users_password);
			
            $payload = array(
                'users_username'=>$dt->users_username,
                'users_password'=>$encryptedPassword
            );
            
			try{
				$this->sql="SELECT * FROM tbl_users WHERE users_username='$dt->users_username' LIMIT 1";
				if($res = $this->pdo->query($this->sql)->fetchColumn()>0){
					$result=$this->pdo->query($this->sql)->fetchAll();
					http_response_code(401);
					$res = null; $code = 401; $msg = "Username Exist"; $remarks = "failed";
				}else{
				$sqlstr = "INSERT INTO tbl_users(users_username, users_password, users_contactno, users_email, users_houseno, users_street, users_brgy, users_city,  users_fname, users_lname)
                VALUES ('$dt->users_username', '$encryptedPassword', '$dt->users_contactno','$dt->users_email', '$dt->users_houseno', '$dt->users_street', '$dt->users_brgy', '$dt->users_city', '$dt->users_fname', '$dt->users_lname' )";
				$this->pdo->exec($sqlstr);
				return array("code"=>200, "remarks"=>"success", "id"=>$this->pdo->lastInsertId());
				}
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return array("code"=>$code, "msg"=>$msg);
        }

		public function checkEmail($dt) {

			$this->sql="SELECT * FROM accounts WHERE acc_email='$dt->acc_email' LIMIT 1";

			try {
				if ($res = $this->pdo->query($this->sql)->fetchColumn()>0) {
					$result=$this->pdo->query($this->sql)->fetchAll();
					http_response_code(401);
					$res = null; $code = 401; $msg = "Email exist"; $remarks = "failed";
				} else{
					http_response_code(200);
					$res = null; $code = 200; $msg = "Email does not exist"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload(base64_encode(json_encode($res)), $remarks, $msg, $code);
		}

		public function checkUsername($dt) {

			$this->sql="SELECT * FROM accounts WHERE acc_username='$dt->acc_username' LIMIT 1";

			try {
				if ($res = $this->pdo->query($this->sql)->fetchColumn()>0) {
					$result=$this->pdo->query($this->sql)->fetchAll();
					http_response_code(401);
					$res = null; $code = 401; $msg = "Username exist"; $remarks = "failed";
				} else{
					http_response_code(200);
					$res = null; $code = 200; $msg = "Username does not exist"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload(base64_encode(json_encode($res)), $remarks, $msg, $code);
		}

		public function verifyEmail($dt) {

			$this->sql="SELECT * FROM accounts WHERE acc_email='$dt->acc_email' LIMIT 1";

			try {
				if ($res = $this->pdo->query($this->sql)->fetchColumn()>0) {
					$result=$this->pdo->query($this->sql)->fetchAll();

					$data = array(); $code = 0; $msg = ""; $remarks = ""; $token = "";
					foreach ($result as $rec) { 
						if($dt->acc_otp == $rec['acc_otp']){
							$this->sql = "UPDATE tbl_accounts SET is_activated=1 WHERE acc_email='$dt->acc_email'";
							$sqlstr = $this->pdo->prepare($this->sql);
							$sqlstr->execute();
							$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
						} else{
							http_response_code(401);
							$res = null; $code = 401; $msg = "Incorrect otp"; $remarks = "failed";
						}
					}
				} else{
					http_response_code(401);
					$res = null; $code = 401; $msg = "User does not exist"; $remarks = "failed";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload(base64_encode(json_encode($res)), $remarks, $msg, $code);
		}

		public function updatePassword($dt, $filter_data) {
			$encryptedPassword = $this->encryptPassword($dt->user_pword);

			try {
				$sqlstr = "UPDATE tbl_user SET user_pword = '$encryptedPassword' WHERE $filter_data";
					
				if($this->pdo->query($sqlstr)) {
					$data = null; $code = 200; $msg = "Successfully Changed Password"; $remarks = "success";
				} else { 
					$data = null; $code = 400; $msg = "Bad Request"; $remarks = "failed";
				}
				
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

		public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Bernie L. Inociete Jr., Developer',
				"timestamp"=>date_create()
			);
		} 

		function pwordCheck($pw, $existingpw){
			$hash=crypt($pw, $existingpw);
			if($hash === $existingpw){return true;} else {return false;}
		}
	}
?>