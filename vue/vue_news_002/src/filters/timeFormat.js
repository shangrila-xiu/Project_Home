
export const normalTime=(times)=>{
	if(times){
// alert(oDate.toLocaleDateString().replace(/\//g, "-") + " " + oDate.toTimeString().substr(0, 8))
		return new Date(parseInt(times) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
	}else{
		return "未知"
	}
}
