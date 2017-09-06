<?php
$file=$_FILES['file'];
foreach ($file as $key => $value) {
    $$key=$value;
}
$path='upload/'.time().strtolower(strstr($name, '.'));  //修改上传文件的名称,strstr($name, '.')是获取后缀名
move_uploaded_file($tmp_name,$path);
$path=strstr($path,$path[0]);  //图片的存储地址
$arr=array(    
    "url"=>$path
);
$json=json_encode($arr);  //json
echo $json;
?>