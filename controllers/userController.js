const User = require("./../model/userModel");

//Creating new user
exports.createUser = async (req, res) => {
    console.log(req.body);

    try {
        const newUser = await User.create(req.body);
        res.status(202).json({
            status: 'Sucess',
            data: {
                user: req.body
            },
        
            
        })
            console.log(req.body.fullName);
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            message: 'User registration not successful'
        })
    }
// use this when you have gui
//   try {
//     const newUser = User.create(
//       {
//         fullName: req.body.name,
//         contactNumber: req.body.number,
//         emailAddress: req.body.email,
//       },
//       function (err) {
//         if (err) {
//           console.log();
//         } else {
//           // res.render('successView',{
//           //     successMessage:'Contact has been saved'
//           // })
//           // For postman - API
//           res.status(202).json({
//             status: "sucess",
//             data: {
//               user: newUser,
//             },
//           });
//         }
//       }
//     );
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
};

//Updating the user information
exports.updateUser = async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(
      req.params.id, req.body,
      // {
      //   fullName: req.body.fullname,
      //   contactNumber: req.body.phone,
      //   emailAddress: req.body.email,
      // },
      {
        new: true,
        runValidators: true,
      });
      if(!updatedData) {
        console.log('No document found with that ID');
      }else {
        res.status(200).json({
          status: "sucess updated",
          message: updatedData
        })
      }

      // function (err) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Updated");
      //     // res.render("successView", {
      //     //   successMessage: "Update success!🤗",
      //     // });
      //     res.status(200).json({
      //       status: "sucess updated",
      
      //       data: {
      //         message: "Updated data!"
      //       },
      //     });
      //   }
      // }

    // for postman

  } catch (err) {
    console.log('Update unsuccessful due to ' + err);
  }
};

//Delete View
exports.deleteView = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.render("deleteView", {
      userid: user._id,
    });
  } catch (err) {
    console.log(err);
  }
};
//Delete data
exports.deleteUser = async (req, res) => {
  try {
   const deletedData =  await User.findByIdAndDelete(req.params.id)
    if(!deletedData){
      console.log('No document found with that ID');
    }
    res.status(204).json({
      status: 'status',
      data: deletedData
    })
  }catch (err) {}
};
//Alluser View
exports.getAllUser = async (req, res) => {
  try {
    const AllUser = await User.find();
    if (AllUser == "") {
      res.render("errorView", {
        errorMessage: "No data available!",
      });
      // res.render('successView',{
      //     successMessage: 'No data available!'
      // })
    } else {
      // res.render('listView', {
      //     foundUser: AllUser
      //  })
      res.status(200).json({
        status: "Get all user success!",
        AllUser,
      });
    }
  } catch (err) {
    res.render("errorView");
  }
};

//Getting single data from document
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    // res.render('viewUser',{
    //     foundID: user._id,
    //     fullname: user.fullName,
    //     phone: user.contactNumber,
    //     email: user.emailAddress,
    // });
    res.status(200).json({
      status: "get single user success!",

      data: {
        user,
      },
    });
    //     res.render('viewUser', {
    //         foundID: results._id,
    //         user: results.fullname,
    //         phone: results.phone,
    //         email: results.email
    //     })
    // })
  } catch (err) {
    res.render("errorView", {
      errorMessage: "Cannot retrieve data at the moment, try again later!",
    });
  }
};
