<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');//定义编码Javascript
header("Cache-Control: no-cache, must-revalidate");//当前页面不进行缓存，每次访问的时间必须从服务器上读取最新的数据
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");//内容过期时间,故意写一个过期时间目的也是让浏览器去重新读取页面内容

$con = mysql_connect('localhost', 'root', 'root');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("vc2015", $con);

$arraystr=$_GET["array"];
$day=$_GET["day"];
//echo "haha";

$array=explode(',',$arraystr);
$arrayLength = count($array);
//echo $arrayLength."  ";

/*
$thInfo = mysql_query("DESC userFeatureFri");
while($row = mysql_fetch_array($thInfo)){
	echo $row[0]." ";
}
*/
$attrDataAll = array();
for($i=0;$i<$arrayLength;++$i){
	$attrData = array();
	$attrDataAll[$array[$i]] = $attrData;
}
$idData = array();

$sql = "select id";
for($i=0;$i<$arrayLength;++$i){
	$attrData = $array[$i];
	$sql = $sql.",".$attrData;
}
if($day=="Fri")$sql = $sql." from userFeatureFri";
elseif($day=="Sat")$sql = $sql." from userFeatureSat";
elseif($day=="Sun")$sql = $sql." from userFeatureSun";
//echo $sql;

$res = mysql_query($sql,$con);
$index = 0;
while($row = mysql_fetch_array($res)){
	$idData[] = (int)$row['id'];
	//echo $idData[$index]." ";
	for($i=0;$i<$arrayLength;++$i){
		if($array[$i]=="wayPercent")$attrDataAll[$array[$i]][] = (double)($row[$array[$i]]);
		else if($array[$i]=="average"||$array[$i]=="inin"||$array[$i]=="outout"||$array[$i]=="stay"||$array[$i]=="average"||$array[$i]=="way"){
			$attrDataAll[$array[$i]][] = (double)($row[$array[$i]])/3600;
		}
		else $attrDataAll[$array[$i]][] = (int)($row[$array[$i]]);
		//echo $attrDataAll[$array[$i]][$index]." ";
	}
	++$index;
}
$tmp = array("id"=>$idData);

for($i=0;$i<$arrayLength;++$i){
	$tmp[$array[$i]] = $attrDataAll[$array[$i]];
}

$json_string = json_encode($tmp);
echo $json_string;


mysql_close($con);
?>