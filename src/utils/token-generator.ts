import jwt from 'jsonwebtoken';

const generateToken = async (user: any) => {
  const token = await jwt.sign(user, process.env.JWT_SECRET || '', {
    expiresIn: '10d',
  });
  return token;
};

export default generateToken;
