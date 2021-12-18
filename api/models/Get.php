<?php


class Get{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

	function selectScheduleJoin($table, $filter_data) {
			
		$this->sql = "SELECT tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_users.users_id = $filter_data";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectBarbersScheduleJoin($table, $filter_data) {
			
		$this->sql = "SELECT tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_barbers.barbers_id = $filter_data";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectBarbersScheduleJoinStatus($table, $filter_data, $filter_data2) {
			
		$this->sql = "SELECT tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_barbers.barbers_id = $filter_data AND tbl_schedules.schedules_status = $filter_data2 ORDER BY tbl_schedules.schedules_date ASC";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectBarbersScheduleJoinStatus2($table, $filter_data, $filter_data2, $filter_data3) {
			
		$this->sql = "SELECT tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_barbers.barbers_id = $filter_data AND tbl_schedules.schedules_status = $filter_data2 OR tbl_schedules.schedules_status = $filter_data3 ORDER BY tbl_schedules.schedules_date ASC";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectUsersScheduleJoinStatusExtra($table, $filter_data, $filter_data2, $filter_data3) {
			
		$this->sql = "SELECT tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_users.users_id = $filter_data AND tbl_schedules.schedules_status = $filter_data2 OR tbl_schedules.schedules_status = $filter_data3 ORDER BY tbl_schedules.schedules_date ASC";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectUsersScheduleJoinStatus($table, $filter_data, $filter_data2) {
			
		$this->sql = "SELECT tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_id,
		tbl_schedules.schedules_users_id,
		tbl_schedules.schedules_barbers_id,
		tbl_schedules.schedules_date,
		tbl_schedules.schedules_status,
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id
		FROM tbl_schedules
		LEFT JOIN tbl_users ON tbl_schedules.schedules_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_schedules.schedules_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_users.users_id = $filter_data AND tbl_schedules.schedules_status = $filter_data2 ORDER BY tbl_schedules.schedules_date ASC";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}

	function selectBarbersSchedulesJoin($table, $filter_data) {
			
		$this->sql = "SELECT 
		tbl_users.users_id,
		tbl_users.users_contactno,
		tbl_users.users_email,
		tbl_users.users_houseno,
		tbl_users.users_street,
		tbl_users.users_brgy,
		tbl_users.users_city,
		tbl_users.users_fname,
		tbl_users.users_lname,
		tbl_barbers.barbers_username,
		tbl_barbers.barbers_fname,
		tbl_barbers.barbers_lname,
		tbl_barbers.barbers_rating,
		tbl_barbers.barbers_email,
		tbl_barbers.barbers_contactno,
		tbl_barbers.barbers_id,
		tbl_reviews.reviews_id,
		tbl_reviews.reviews_barbers_id,
		tbl_reviews.reviews_users_id,
		tbl_reviews.reviews_ratings
		FROM tbl_reviews
		LEFT JOIN tbl_users ON tbl_reviews.reviews_users_id = tbl_users.users_id
		LEFT JOIN tbl_barbers ON tbl_reviews.reviews_barbers_id = tbl_barbers.barbers_id";
		if($filter_data != null) {
			$this->sql .= " WHERE tbl_barbers.barbers_id = $filter_data";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->sendPayload($data, $remarks, $msg, $code);
	}


	public function sendPayload($payload, $remarks, $message, $code) {
		$status = array("remarks"=>$remarks, "message"=>$message);
		http_response_code($code);
		return array(
			"status"=>$status,
			"payload"=>$payload,
			'prepared_by'=>'Solis, Tracey A., Developer',
			"timestamp"=>date_create());
	} 
	

    public function pullRentals ($d) {
		$sql = "SELECT * FROM tbl_rental";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	}


	public function pullBrands($d) {
		$sql = "SELECT * FROM tbl_brands";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
		return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	}







	function pullByBrand($table, $d) {
	
		$this->sql = "SELECT tbl_rental.rent_id AS carRentalID,
		tbl_car.car_id,
		tbl_car.rent_id,
		tbl_car.car_color,
		tbl_car.car_model,
		tbl_car.car_brand,
		tbl_car.car_seater,
		tbL_car.car_fuel,
		tbl_car.car_transmission,
		tbl_car.car_rateHalf,
		tbl_car.car_rateDay,
		tbl_car.car_rateWeek,
		tbl_car.car_rateMonth,
		tbl_car.car_status,
		tbl_car.car_image
		FROM tbl_car
		LEFT JOIN tbl_rental ON tbl_rental.rent_id = tbl_car.rent_id";

		if($d != null) {
			$this->sql .= " WHERE tbl_car.car_brand = '$d->car_brand' AND tbl_car.rent_id = '$d->rent_id'";
		}

		$data = array(); $code = 0; $msg= ""; $remarks = "";
		try {
			if ($res = $this->pdo->query($this->sql)->fetchAll()) {
				foreach ($res as $rec) { array_push($data, $rec);}
				$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
			}
		} catch (\PDOException $e) {
			$msg = $e->getMessage(); $code = 401; $remarks = "failed";
		}
		return $this->gm->sendPayload($data, $remarks, $msg, $code);
	}




}
?>