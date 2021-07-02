let mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/dance',{useNewUrlParser:true,useUnifiedTopology:true});

let db=mongoose.connection;
db.on('error',console.error.bind(console,'connection-error:'));

db.once('open',function(){
	console.log('MongoDB and project backend connected!');
});

let contactschema= new mongoose.Schema({
	name: String,
	contactno: String,
	emailid: String
});

contactschema.methods.showdetails= function(){
	

	let string= 'The name of the user is: '+this.name+", the contact no. is "+this.contactno+' and the email address is '+this.emailid;
	console.log(string);
}

let contactclass= mongoose.model('record',contactschema);

let record=new contactclass({
	name:"Sheetal",
	contactno:"7000150649",
	emailid:"sheetal992009@gmail.com"
});

console.log(record.emailid);
record.showdetails();

record.save(function(err,record){
	console.log('Record saved successfully!');
});