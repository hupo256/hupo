<?php
$con = mysql_connect("127.0.0.1","root","662875");  //连接DB
if (!$con)die('Could not connect: ' . mysql_error());   //如果没连接成功则报错 
if (mysql_query("CREATE DATABASE my_db",$con)){
	echo "Database created";
}else{
	echo "Error creating database: " . mysql_error();
}
mysql_select_db("my_db", $con);
$sql = "CREATE TABLE Persons (
		personID int NOT NULL AUTO_INCREMENT, 
		PRIMARY KEY(personID),
		FirstName varchar(15),
		LastName varchar(15),
		Age int
	)";
mysql_query($sql,$con);

mysql_query("INSERT INTO Persons (FirstName, LastName, Age) 
VALUES ('Peter', 'Griffin', '35')");

mysql_query("INSERT INTO Persons (FirstName, LastName, Age) 
VALUES ('Glenn', 'Quagmire', '33')");

mysql_close($con);
?>