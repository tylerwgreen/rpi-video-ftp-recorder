var FTP		= {
	params:	{
	},
	init:	function(params){
		console.log('FTP.init', params);
		this.params = Object.assign(this.params, params);
	}
};
module.exports = FTP;