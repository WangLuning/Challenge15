<?php
error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');
header("Cache-Control: no-cache, must-revalidate");
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

$timestart=$_POST["timestart"];
$timeend=$_POST["timeend"];
$idstr=$_POST["idstr"];
$day=$_POST["day"];
$flag=$_POST["flag"];

$con = mysql_connect('localhost', 'vc2015', 'vc2015');
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("vc2015", $con);
//mysql_select_db("aaa", $con);

$id=explode(',',$idstr);
$arrlength=count($id);
if($flag==0){
	global $sql;
	$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend." "
		."and idfrom in (".$idstr.")"
		." union "
		."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE time>= ".$timestart." and time<=".$timeend." "
		."and idto in (".$idstr.")";
	if($day==0){
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend." "
			."and fromid in (".$idstr.")"
			." union "
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend." "
			."and toid in (".$idstr.")";
		//print_r($sql);
	}elseif($day==1){
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsat WHERE time>= ".$timestart." and time<=".$timeend." "
			."and idfrom in (".$idstr.")"
			."union"
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsat WHERE time>= ".$timestart." and time<=".$timeend." "
			."and idto in (".$idstr.")";
	}else{
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsun WHERE time>= ".$timestart." and time<=".$timeend." "
			."and idfrom in (".$idstr.")"
			."union"
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsun WHERE time>= ".$timestart." and time<=".$timeend." "
			."and idto in (".$idstr.")";
	}

}else{
	global $sql;
	$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend.""
		." union "
		."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE time>= ".$timestart." and time<=".$timeend."";
	if($day==0){
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend.""
			." union "
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commfri WHERE timenum>= ".$timestart." and timenum<=".$timeend."";
		//print_r($sql);
	}elseif($day==1){
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsat WHERE time>= ".$timestart." and time<=".$timeend.""
			."union"
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsat WHERE time>= ".$timestart." and time<=".$timeend."";
	}else{
		global $sql;
		$sql="SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsun WHERE time>= ".$timestart." and time<=".$timeend.""
			."union"
			."SELECT fromid,toid,timenum,xfrom,yfrom,xto,yto FROM commsun WHERE time>= ".$timestart." and time<=".$timeend."";
	}
}

$result = mysql_unbuffered_query($sql);

$idfrom=array();$idto=array();$fromx=array();$tox=array();$fromy=array();$toy=array();$idtime=array();
$idcountfrom=array();$idcountto=array();$count=array();

for($x=0;$x<$arrlength;$x++) {
	$count[$x]=$id[$x];
	$idcountfrom[$x]=0;
	$idcountto[$x]=0;
}

$i=0;
$res=array();
$res[0]=0;
while($row = mysql_fetch_array($result)){
   //array_push($idx,$row['x']);
   $res[$i+1]=array(
		"idfrom"=>$row['fromid'],
		"idto"=>$row['toid'],
		"fromx"=>$row['xfrom'],
		"fromy"=>$row['yfrom'],
		"tox"=>$row['xto'],
		"toy"=>$row['yto'],
		"idtime"=>$row['timenum']
   );

   for($x=0;$x<$arrlength;$x++) {
		if($row['fromid'].""==$count[$x].""){$idcountfrom[$x]=$idcountfrom[$x]+1;break;}
		if($row['toid'].""==$count[$x].""){$idcountto[$x]=$idcountto[$x]+1;break;}
   }
   $i=$i+1;
}


$res[0]=array(
	"idcount"=>$count,
	"fromcount"=>$idcountfrom,
	"tocount"=>$idcountto
);


//print_r($res);
$json_string = json_encode($res);
//print_r($json_string);     
echo $json_string;
mysql_close($con);
?>