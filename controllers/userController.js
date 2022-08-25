const User = require('./../model/userModel');

//Creating new user
exports.createUser = async (req,res) => {
    try {
      await User.create({
            fullName: req.body.name,
            contactNumber: req.body.number,
            emailAddress: req.body.email
        }, function (err){
            if(err) {
                console.log();
            }
            else {
                res.render('successView',{
                    successMessage:'Contact has been saved'
                })
            }
        })
        //For postman - API
        // res.status(202).json({
        //     status: 'sucess',
        //     data: {
        //         user: newUser,
        //     }
        // });
    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

//Updating the user information
exports.updateUser = async (req,res) => {
        try {
            await User.findByIdAndUpdate(req.body.id ,
            { 
                fullName: req.body.fullname ,
                contactNumber: req.body.phone,
                emailAddress: req.body.email,
            },{
                new: true,
                runValidators: true
            },
                function (err) {
                     if(err){
                        console.log(err);
                     }  
                     else {
                        console.log("Updated");
                        res.render('successView', {
                            successMessage:'Update success!🤗' 
                        });
                     } 
                }
                );
                // for postman
                // res.status(200).json({
                //     status: 'sucess updated',
                 
                //     data: {
                //         user,
                //     }
                // })
        
        }
        catch(err) {
            
        }
}

//Delete View
exports.deleteView = async (req,res) => {
    try{
      const user = await User.findById({_id: req.params.id});
            res.render('deleteView', {
                userid: user._id,
            });
    }   
    catch(err) {
        console.log(err);
    }
}
//Delete data
exports.deleteUser = async (req,res) => {
    try {
        
        await User.findByIdAndDelete(req.body.userID,(err) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log('Deleted');
                res.redirect('/view')
                
            }
        })
    }
    catch(err) {

    }
}
//Alluser View
exports.getAllUser = async (req,res) => {
     try {
         const AllUser = await User.find()
         if(AllUser == ''){
            res.render('errorView',{
                errorMessage: 'No data available!'
            })
            // res.render('successView',{
            //     successMessage: 'No data available!'
            // })
         }
         else {
            res.render('listView', {
                foundUser: AllUser
             })
         }
     }
     catch (err) {
        res.render('errorView');
     }
}

//Getting single data from document
exports.getUser = async (req,res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        res.render('viewUser',{
            foundID: user._id,
            fullname: user.fullName,
            phone: user.contactNumber,
            email: user.emailAddress,
        });
            
            //     res.render('viewUser', {
            //         foundID: results._id,
            //         user: results.fullname,
            //         phone: results.phone,
            //         email: results.email
            //     })
            // })
    }
    catch(err) {
        res.render('errorView', {
            errorMessage: 'Cannot retrieve data at the moment, try again later!'
        })
    }
}
