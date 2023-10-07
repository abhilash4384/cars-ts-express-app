import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
export default function (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // create log files date wise
  const fileName = `${day}-${month}-${year}-error-logs.txt`;

  console.log('\n Error = ', err);
  let errorTxt: any = err;
  if (typeof err !== 'string') {
    errorTxt = err?.toString();
  }
  const currentDate = new Date().toString();
  const stars = '*'.repeat(10);
  fs.appendFile(
    `./logs/${fileName}`,
    `\n${stars} Start Log: ${currentDate} ${stars}\n ${errorTxt} \n`,
    (fileError) => {
      if (fileError) console.log('Error while writing logs ');
    }
  );

  res.status(500).json({
    isSuccess: false,
    data: null,
    message: 'Server Error',
  });
}
