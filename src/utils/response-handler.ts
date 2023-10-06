const responseHandler = (
  data: any,
  isSuccess: boolean = true,
  message: string = '',
  error: any = null
) => ({
  data,
  isSuccess,
  message,
  error,
});
export default responseHandler;
