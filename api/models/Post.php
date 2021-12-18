<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->gm = new GlobalMethods($pdo);
		}

		
	

		function selectCarJoin($table, $filter_data) {
			
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
			tbl_car.car_status
			FROM tbl_car
			LEFT JOIN tbl_rental ON tbl_rental.rent_id = tbl_car.rent_id";

            if($filter_data != null) {
                $this->sql .= " WHERE $filter_data";
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

		public function storeDescription($table, $filter_data) {

			$this->sql = "SELECT * FROM $table";

			if($filter_data != null) {
				$this->sql .= " WHERE rent_id=$filter_data";
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
    }
?>