Template.home.events({
	'submit form':function(e){
		e.preventDefault();
		var randomString=Math.random().toString(36).substring(2,7);
		var defaultUrl='http://localhost:3000/';
		var shortUrl=defaultUrl+randomString;
		var longUrl=$(e.target).find('#input1').val();
		var urlItem={
			longUrl:longUrl,
			shortUrl:shortUrl
		};
		if(longUrl){
			urlItem._id=UrlList.insert(urlItem);
			$('#input1').val('');
		}
		
	}
});