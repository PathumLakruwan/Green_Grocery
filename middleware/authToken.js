const jwt =require('jsonwebtoken')

async function authToken(req,res,next) {

  try {
    const token = req.cookies?.token

    if(!token){
        return res.status(200).json({
            message : 'User Not Loogin',
            error: true,
            success:false
        })
    }

    jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(error,decoded){
        console.log(error)
        console.log('decoded',decoded)

        if(error){
            console.log('error-auth',error)
        }else{
            req.userID = decoded?._id
            next()

        }

    })


  } catch (error) {
    res.status(400).json({
        message: error.message || error,
        data: {},
        error: true,
        success: false
    })
  }
}

module.exports = authToken
