<?php
$con = mysql_connect("127.0.0.1","root","662875");  //连接DB
if (!$con)die('Could not connect: ' . mysql_error());   //如果没连接成功则报错 
mysql_select_db("my_db", $con);   //指定具体的数据库

$sql="SELECT * FROM Persons";  //从表里选择数据

//获取到前台传琮来的数据
$fn = $_POST['fname'];
$ln = $_POST['lname'];
$ag = $_POST['age'];

//添加到表里
mysql_query("INSERT INTO Persons (FirstName, LastName, Age) 
VALUES ('$fn','$ln','$ag')");

echo $_POST['fname']. " ". $_POST['lname']. " ".$_POST['age'];

mysql_close($con);  // 顺手关掉DB
?>