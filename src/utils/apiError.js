class apiError extends Error(){
    constructor(statusCode,
        message = "something went wrong",
        errors=[],
        statck="")
        {
         super(message)
         this.statusCode = statusCode
         this.data=null
        //  this.statck = statck
         this.message = message
         this.success = false
         this.errors = errors

         if(statck){
            this.statck=statck
         }else{
            Error.captureStackTrace(this,this.constructor)
         }
    }
}

export  {apiError}