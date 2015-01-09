Template.home.events({
	'submit form':function(e){
		e.preventDefault();
		var randomString=Math.random().toString(36).substring(2,7);
		var defaultUrl='http://localhost:3000/';
		var shortUrl=defaultUrl+randomString;
		var urlItem={
			longUrl:$(e.target).find('#input1').val(),
			shortUrl:shortUrl
		};
		urlItem._id=UrlList.insert(urlItem);
	}
});