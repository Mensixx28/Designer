<?php
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');
if (!empty($username)){
if (!empty($password)){
    
$host ="localhost:3307";
$dbusername ="root";
$dbpassword ="";
$dbname ="ttdm";

//Create Connection
$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error()){
    die('Connect Error('.mysqli_connect_errno().') '
    . mysqli_connect_error());
}
else{
    $sql = "INSERT INTO account (username, password)
    values ('$username','$password')";
    if ($conn->query($sql)){
        echo "Account created successfully!";
        header('location: home.html');
    }
    else {
        echo "Error:".sql."<br>".$conn->error;
    }
    $conn->close();
}
}
else{
    echo "Enter required fields";
    die();
}
} else{
    echo "Enter required fields";
    die();
}    

?>