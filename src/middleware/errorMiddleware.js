


const errorMiddleware = ({req,res,error,message}) => {
  return (
    console.log(error)
  )
}

export default errorMiddleware