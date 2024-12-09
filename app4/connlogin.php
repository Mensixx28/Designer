<?php
session_start();

    $host = "localhost:3307";  // Your database host
    $dbusername = "root";      // Your database username
    $dbpassword = "";          // Your database password
    $dbname = "ttdm";          // Your database name

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if(!empty($username) && !empty($password))
    {
        $query = "SELECT * FROM account WHERE username='$username' limit 1";
        $result = mysqli_query($conn, $query);

        if($result)
        {
            if($result && mysqli_num_rows($result) > 0)
            {
                $user_data = mysqli_fetch_assoc($result);

                if ($user_data['password'] == $password)
                {
                    header('location: home.html');
                    die;
                }
            }
        }
        echo "<script type='text/javascript'> alert('wrong username or password')</script>";
        header('location: index.html');
    }
    else{
        echo "<script type='text/javascript'> alert('wrong username or password')</script>";
    }
}
?>
