<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');//定义编码Javascript
header("Cache-Control: no-cache, must-revalidate");//当前页面不进行缓存，每次访问的时间必须从服务器上读取最新的数据
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");//内容过期时间,故意写一个过期时间目的也是让浏览器去重新读取页面内容

$idstr=$_GET["id"];
$day=$_GET["day"];


$con = mysql_connect('localhost', 'vc2015', 'vc2015');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("vc2015", $con);
//mysql_select_db("aaa", $con);

//$idstr="39012,530079";
//$day=2;

//$sql="SELECT * FROM ttt WHERE id = ".$id."";
$id=explode(',',$idstr);
$arrlength=count($id);
for($x=0;$x<$arrlength;$x++) {
	$sql="SELECT x,y,time FROM movfri WHERE id = ".$id[$x]." ORDER BY time " ;
	if($day==0){
		global $sql;
		$sql="SELECT x,y,time FROM movfri WHERE id = ".$id[$x]." ORDER BY time " ;
	}elseif($day==1){
		global $sql;
		$sql="SELECT x,y,time FROM movsat WHERE id = ".$id[$x]." ORDER BY time " ;
	}else{
		global $sql;
		$sql="SELECT x,y,time FROM movsun WHERE id = ".$id[$x]." ORDER BY time " ;
	}
	$result = mysql_unbuffered_query($sql);
	//print_r(mysql_fetch_array($result)) ;
	$idx=array();$idy=array();$idtime=array();
   $i=0;
   while($row = mysql_fetch_array($result)){
	   //array_push($idx,$row['x']);
	   $idx[$i]=$row['x'];
	   $idy[$i]=$row['y'];
	   $idtime[$i]=$row['time'];
	   $i=$i+1;
   }
   $tmp=array(
		"id"=>$id[$x],
		"x"=>$idx,
		"y"=>$idy,
		"time"=>$idtime
   );
	//print_r($tmp) ;
   $res[$x]=$tmp;
	
}

$json_string = json_encode($res);
//$arr=json_decode($json_string);//再进行json解码
//print_r($json_string);     
echo $json_string;
mysql_close($con);
?>