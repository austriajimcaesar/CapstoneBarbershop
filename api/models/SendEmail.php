<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'models/PHPMailer/vendor/autoload.php';

    class SendEmail {
        protected $gm, $pdo;
        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
			$this->gm = new GlobalMethods($pdo);
		}

        function send_email($dt) {
            $email = $dt->usr_email;
            $code = $dt->usr_code;
            $message = $dt->message;

            $mail = new PHPMailer(TRUE);

            $mail->isSMTP();                                  
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth = true;                          
            $mail->Username = "jet.main111@gmail.com";                 
            $mail->Password = "jet123456";                           
            $mail->SMTPSecure = "tls";                          
            $mail->Port = 587;                
            $mail->From = "jet.main111@gmail.comm";
            $mail->FromName = "EMES Barbershop";
            $mail->addAddress("$email");

            $mail->isHTML(true);

            $mail->Subject = "BarberShop";
            $mail->Body = "<i>To $email, $message </i><br><br><br>$code</br>";
            $mail->AltBody = "";

            $mail->send();

            http_response_code(200);
            return array(
				'status'=>'Email sent sucessfully',
				'email'=>$email,
				'prepared_by'=>'uvuvuaweawe, Developer',
				'timestamp'=>date('D M j, Y G:i:s T')
            );
        }
    }
?>