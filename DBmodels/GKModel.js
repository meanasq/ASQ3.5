var express 	= require('express');
var mongoose 	= require('mongoose');
var encryptor 	= require('mongoose-encryption');

var encKey = process.env.encKey;
var sigKey = process.env.sigKey;

var GKSchema = new mongoose.Schema({
    id 				: Number,
    content 		: String,
    choices 		: Object,
    correctChoice 	: String,
    category 		: String,
    image 			: String
});

GKSchema.plugin(encryptor, { 
	encryptionKey 	: encKey, 
	signingKey 		: sigKey, 
	encryptedFields : ['content', 'correctChoice', 'choices'] 
});

module.exports = mongoose.model('GKModel', GKSchema);
