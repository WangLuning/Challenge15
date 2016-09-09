<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');
header("Cache-Control: no-cache, must-revalidate");
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

$timestart=$_GET["timestart"];
$timeend=$_GET["timeend"];
$day=$_GET["day"];


$con = mysql_connect('localhost', 'vc2015', 'vc2015');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("vc2015", $con);
//mysql_select_db("aaa", $con);

$id=explode(',',$idstr);
$arrlength=count($id);

$sql="SELECT distinct fromid FROM commfri WHERE timenum >= ".$timestart." AND timenum<=".$timeend.""
	." union "
	."SELECT distinct toid FROM commfri WHERE timenum >= ".$timestart." AND timenum<=".$timeend."";
if($day==0){
	global $sql;
	$sql="SELECT distinct fromid FROM commfri WHERE timenum >= ".$timestart." AND timenum<=".$timeend.""
	." union "
	."SELECT distinct toid FROM commfri WHERE timenum >= ".$timestart." AND timenum<=".$timeend."";
	//print_r($sql); 
}elseif($day==1){
	global $sql;
	$sql="SELECT distinct fromid FROM commsat WHERE timenum >= ".$timestart." AND timenum<=".$timeend.""
	." union "
	."SELECT distinct toid FROM commsat WHERE timenum >= ".$timestart." AND timenum<=".$timeend."";
}else{
	global $sql;
	$sql="SELECT distinct fromid FROM commsun WHERE timenum >= ".$timestart." AND timenum<=".$timeend.""
	." union "
	."SELECT distinct toid FROM commsun WHERE timenum >= ".$timestart." AND timenum<=".$timeend."";
}
//print_r($result); 
$result = mysql_unbuffered_query($sql);

$res=array();
$idArr=array();
$res[0]=0;

$i=0;
while($row = mysql_fetch_array($result)){
   //array_push($idx,$row['x']);
   $idArr[$i]=$row['fromid'];
   $i=$i+1;
}


$res[0]=array(
	"id"=>$idArr
);


//print_r($res);
$json_string = json_encode($res);
print_r($json_string);     
//echo $json_string;
mysql_close($con);
?>