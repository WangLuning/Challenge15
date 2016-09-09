<?php

/*
 * url?fields=attr1,attr2,attr3&attr1=from,to&attr4=from,to
 * example
 * http://120.27.55.102/test/wang.php?fields=stay,average,comm&days=friday,saturday&stay=10000,20000&average=1000,2000
 * days=friday,saturday,sunday
 */

error_reporting(E_ALL & ~E_DEPRECATED);
error_reporting(E_ALL || ~E_NOTICE);
header('Content-Type: text/json');//定义编码Javascript
header("Cache-Control: no-cache, must-revalidate");//当前页面不进行缓存，每次访问的时间必须从服务器上读取最新的数据
//A date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");//内容过期时间,故意写一个过期时间目的也是让浏览器去重新读取页面内容

$con = mysql_connect('localhost', 'vc2015', 'vc2015');
if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("vc2015", $con);

$fields_str = $_GET["fields"];
$days = array();

$constrans=array();
foreach ($_GET as $key=>$value) {
  if($key == "fields"){
    $fields_str = $value; 
  }else if($key == "days"){
    $days = explode(',', $value);
  }else{
    $constrans[$key]=explode(',', $value);
  }
}


function getConstransPart($constrans){
  $items = array(); 
  foreach ($constrans as $attr => $vals) {
    $str = $attr . " between " . $vals[0] . " and " . $vals[1] . " ";
    array_push($items, $str);
  }
  return join(' and ', $items);
}

function queryData($con, $tablename, $fields_str, $cons){
  $fields=explode(',',$fields_str);
  $nFields = count($fields);

  $resp= array("ids"=>array());
  foreach ($fields as $attr) {
    $resp[$attr] = array();
  }
  $sql = "select id," . $fields_str . " from " . $tablename . " ";
  if($cons && trim($cons) != ""){
    $sql = $sql . " where " . $cons . " ";
  }
  $sql = $sql . " order by id ";
  $res = mysql_query($sql, $con);
  if(!$res){
    echo "DB error\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
  }
  $i = 0;
  while($row = mysql_fetch_array($res)){
    foreach ($fields as $attr) {
      array_push($resp[$attr], $row[$attr]);
      if(i == 0){
        array_push($resp["ids"], $row["id"]);
      }
    }
    $i++;
  }
  return $resp;
}

$tables = array(
  "friday"=>"userFeatureFri", 
  "saturday"=>"userFeatureSat",
  "sunday"=>"userFeatureSun"
); 

$days_table = array();
if(empty($days)){
  $days_table = $tables;
}else{
  foreach ($days as $day) {
    $days_table[$day] = $tables[$day];
  }
}

$cons = getConstransPart($constrans);

$resObj = array();

foreach ($days_table as $day=>$tablename) {
  $resObj[$day]=queryData($con, $tablename, $fields_str, $cons);
}

mysql_close($con);
header('Content-Type: text/json');
// header('Content-Disposition: attachment; filename="downloaded.json"');
$json_string = json_encode($resObj);
echo $json_string;

/*
 *
 * output format
 * {
 *  "friday":{
 *    "ids": [],
 *    "attr1": [],
 *    "attr2": []
 *  },
 *  "saturday":{
 *    "ids": [],
 *    "attr1": [],
 *    "attr2": []
 *  },
 *  "sunday":{
 *    "ids": [],
 *    "attr1": [],
 *    "attr2": []
 *  }
 * }
 *
 */
?>
