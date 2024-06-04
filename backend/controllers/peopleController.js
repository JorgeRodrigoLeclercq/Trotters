const People = require('../models/People');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {

    createPeople: async(req, res) => {

        const newPerson = new People({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
            interests: req.body.interests,
            description: req.body.description,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        });

        try {
            await newPerson.save();
            res.status(201).json({message: "Person created successfully"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    loginPeople: async(req, res) => {
        try {
            const user = await People.findOne({email: req.body.email});
            !user && res.status(401).json("Wrong credentials provide a valid emal");
            console.log(user.email);

            

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const decryptedpass = decryptedPassword.toString(CryptoJS.enc.Utf8);

            console.log("2");

            decryptedpass !== req.body.password && res.status(401).json("Wrong password");

            console.log("3");

            const userToken = jwt.sign(
                {
                    id: user.id
                }, process.env.JWT_SEC, {expiresIn: "7d"}
            );
            
            console.log("4");

            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;

            res.status(200).json({...userData, token: userToken})

            console.log("5");
        } catch(error){
            //console.log("Failed", error);
            res.status(500).json({message: error})
        }
    },

    getPeople: async(req, res) => {
        try {
            const people = await People.findById(req.params.id)
            res.status(200).json(people)
        } catch (error) {
            res.status(500).json("Failed to get the people")
        }
    },

    searchPeople: async(req, res) => {
        try {
            const result = await People.aggregate(
                [
                    {
                      $search: {
                        index: "people",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)   
        } catch(error) {
            res.status(500).json("Failed to get the people")
        }
    }
}