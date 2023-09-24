//Bu tanımlamalar sayesinde, belirlenen route'ların dışında kalan tüm istekler için 404 hata mesajı döner ve 
//oluşabilecek tüm hatalar için uygun hata mesajları ve durum kodları atanır.
//to be able to use throw new Error("Resource not found") write:
//app.use(notFound);
//app.use(errorHandler); to the server.js (which is root for the backend)


const notFound = (req, res, next) => {
  const error = new Error (`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); //call errorHandler
}

const errorHandler = (err, req, res, next) => {
  let message = err.message; 
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if(err.name === "CastError" && err.kind === "ObjectId"){
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "Error in production" : err.stack,
  })
}

export {notFound, errorHandler};