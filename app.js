
const http=require('http');
const express=require('express');
const fs=require('fs');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Sheetal:Sheetal992009@dearzindagi.hzvha.mongodb.net/dancedramadreams?retryWrites=true&w=majority',{newUrlParser:true, useUnifiedTopology:true});
const db=mongoose.connection;
const multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});
 
var upload = multer({ storage: storage }).single('dpfile');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
	console.log('"dancedramadreams" database successfully connected to the backend server!');
});


//EXPRESS
app.use('/static',express.static('css'));
app.use('/static',express.static('pics'));
app.use('/static',express.static('uploads'));
app.use(express.urlencoded({extended:true}));

//EJS
app.set('view engine','ejs');
app.set('views','views');

//DATABASE
const contactSchema=new mongoose.Schema({
	name:String,
	emailid:String,
	contactno:String
});

const contactModel= mongoose.model('contact',contactSchema);

const artistSchema=new mongoose.Schema({
	name:String,
	emailid:String,
	gender:String,
	age:Number,
	city:String,
	artistcategory:String,
	bio:String,
	dp:String
});

const artistModel=mongoose.model('artist',artistSchema);
const contactpageSchema=new mongoose.Schema({
	name:String,
	emailid:String,
	contactno:String,
	message:String
});

const contactpageModel= mongoose.model('message',contactpageSchema);


app.get('/',function(req,res){
	res.render('home');
});

app.get('/aboutus',function(req,res){
	res.render('aboutus');
});

app.get('/courses',function(req,res){
	res.render('courses');
});


app.get('/contactus',function(req,res){

	
	res.render('contactus');
});

app.get('/artistcorner',function(req,res){
	res.render('artistcorner');
});

app.get('/artistcorner/register',function(req,res){
	res.render('register');
});

app.get('/artistcorner/discover',function(req,res){
	artistModel.find({'artistcategory':'dancer'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'dancer'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_dancer',function(req,res){
	artistModel.find({'artistcategory':'dancer'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'dancer'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_singer',function(req,res){
	artistModel.find({'artistcategory':'singer'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'singer'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_musician',function(req,res){
	artistModel.find({'artistcategory':'musician'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'musician'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_actor',function(req,res){
	artistModel.find({'artistcategory':'actor'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'actor'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_director',function(req,res){
	artistModel.find({'artistcategory':'director'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'director'});
	}).sort({'name':1});
	
});


app.get('/artistcorner/discover_dancetrainer',function(req,res){
	artistModel.find({'artistcategory':'dancetrainer'},function(err,data){
	console.log('Data acquired!');
	console.log(data);
	res.render('discover',{data:data,tab:'dancetrainer'});
	}).sort({'name':1});
	
});




app.post('/artistcorner/register_submit',function(req,res){
	upload(req,res,function(err){

		if(!err)
	{	console.log(req.file);
	

	let artistObject=new artistModel({
		name:req.body.name,
		emailid:req.body.emailid,
		gender:req.body.gender,
		age:req.body.age,
		city:req.body.city,
		artistcategory:req.body.artistcategory,
		bio:req.body.bio,
		dp:req.file.filename
	});

	console.log(artistObject);
	artistObject.save().then(function(){
		console.log('Artist Registered Successfully!');
		console.log(req.body);
		res.redirect('/artistcorner');
	});
}
});
});



app.post('/contactpageformsubmit',function(req,res){
	let obj=new contactpageModel({
		name:req.body.name,
		contactno:req.body.contactno,
		emailid:req.body.emailid,
		message:req.body.message4
	});

	obj.save().then(function(){
		console.log('Message sent successfully!');
		res.redirect('/contactus');
	});
});

/*How to add data to a file
app.post('/submitcallback',function(req,res){
	console.log(req.body);
	res.send('Thanks! Our team will contact you back shortly!');
	fs.appendFileSync('database/callbackform.txt',`Name : ${req.body.name} Contact Co. : ${req.body.contactno} Email ID : ${req.body.emailid}`);
});
*/

//Adding data to the mongodb database
app.post('/submitcallback',function(req,res){
	console.log(req.body);
	let contactobj=new contactModel({
		name:req.body.name,
		emailid:req.body.emailid,
		contactno:req.body.contactno
	});

	contactobj.save().then(function(){
		console.log('Data saved successfully!');
	});

	res.redirect('/contactlist');
});




app.listen(8080,'127.0.0.1',()=>{
	console.log('Server running at 127.0.0.1:8080');
});