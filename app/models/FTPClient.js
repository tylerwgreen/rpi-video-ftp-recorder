var FTPClient		= {
	params:	{
		watchTimer: 0,
		watchDir: null,
		remoteIPs: [],
	},
	init:	function(params){
		console.log('FTPClient.init', params);
		this.params = Object.assign(this.params, params);
	}
};
module.exports = FTPClient;