Template.home.events({
	'submit form':function(e){
		e.preventDefault();
		function checkUnique (){
			function makeRandomString(){
				return Math.random().toString(36).substring(2,7);
			}
			var a=makeRandomString();
			while(UrlList.find({_id:a}).fetch().length!==0){
				a=makeRandomString();
			}
			return a;
		}
		var randomString=checkUnique();
		var defaultUrl='http://localhost:3000/';
		var shortUrl=defaultUrl+randomString;
		var longUrl=$(e.target).find('#input1').val();
		var urlItem={
			_id:randomString,
			longUrl:longUrl,
			shortUrl:shortUrl
		};
		if(longUrl){
			urlItem._id=UrlList.insert(urlItem);
			$('#input1').val('');
		}
		
	}
});