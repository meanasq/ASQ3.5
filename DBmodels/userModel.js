var express     = require('express');
var mongoose    = require('mongoose');
var encryptor   = require('mongoose-encryption');

var encKey = process.env.encKey;
var sigKey = process.env.sigKey;

var userSchema = new mongoose.Schema({
    email       : String,
    password    : String,
    firstName   : String,
    lastName    : String,
    address1    : String,
    address2    : String,
    city        : String,
    state       : String,
    zipcode     : String,
    role        : String,
    activeIn    : String,
    expiryDate  : String,    
    birthDate   : String,
    resetPasswordToken   : String,
    resetPasswordExpires : Date
});

userSchema.plugin(encryptor, { 
    encryptionKey   : encKey, 
    signingKey      : sigKey, 
    encryptedFields : ['role', 'activeIn'] 
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('userModel', userSchema);