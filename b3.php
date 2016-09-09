<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');
header("Cache-Control: no-cache, must-revalidate");
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

$timestart=$_GET["timestart"];
$timeend=$_GET["timeend"];
$x0=$_GET["x0"];
$x1=$_GET["x1"];
$y0=$_GET["y0"];
$y1=$_GET["y1"];
$day=$_GET["day"];


$con = mysql_connect('localhost', 'vc2015', 'vc2015');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("vc2015", $con);
//mysql_select_db("aaa", $con);


$sql="SELECT distinct id FROM movfri WHERE time >= ".$timestart." AND time<=".$timeend." AND x >=".$x0." AND x<=".$x1." AND y >=".$y0." AND y<=".$y1 ."";
if($day==0){
	global $sql;
	$sql="SELECT distinct id FROM movfri WHERE time >= ".$timestart." AND time<=".$timeend." AND x >=".$x0." AND x<=".$x1." AND y >=".$y0." AND y<=".$y1 ."";  
}elseif($day==1){
	global $sql;
	$sql="SELECT distinct id FROM movsat WHERE time >= ".$timestart." AND time<=".$timeend." AND x >=".$x0." AND x<=".$x1." AND y >=".$y0." AND y<=".$y1 ."";
}else{
	global $sql;
	$sql="SELECT distinct id FROM movsun WHERE time >= ".$timestart." AND time<=".$timeend." AND x >=".$x0." AND x<=".$x1." AND y >=".$y0." AND y<=".$y1 ."";
}
$result = mysql_unbuffered_query($sql);
//print_r($result);  
$idx=array();
$i=0;
while($row = mysql_fetch_array($result)){
   //array_push($idx,$row['x']);
   $idx[$i]=$row['id'];
   $i=$i+1;
}
$tmp=array(
	"id"=>$idx,
);
	
$res[0]=$tmp;

$json_string = json_encode($idx);
//print_r($json_string);     
echo $json_string;
mysql_close($con);
?>