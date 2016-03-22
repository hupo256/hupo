<?php
$con = mysql_connect("127.0.0.1","root","662875");  //连接DB
if (!$con)die('Could not connect: ' . mysql_error());   //如果没连接成功则报错 
mysql_select_db("my_db", $con);   //指定具体的数据库

$sql="SELECT * FROM Persons";  //从表里选择数据
$result = mysql_query($sql); 

$arr = array();   //结果的数据容器
while($row = mysql_fetch_array($result)){
	$ar = array($row['FirstName'],$row['LastName'],$row['Age']);
	// array_push($arr, $ar);
	$arr[] = $ar;
}
echo json_encode($arr);   //将结果包装成json，以便返回给前端

mysql_close($con);  // 顺手关掉DB
?>