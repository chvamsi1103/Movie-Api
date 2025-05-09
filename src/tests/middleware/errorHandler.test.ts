import { errorHandler } from '../../middleware/errorHandler';
import { Request } from 'express';

describe('errorHandler middleware', () => {
  it('should log error and return 500 with message', () => {
    const err = new Error('Test error');
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    console.error = jest.fn();

    errorHandler(err, req, res, next);

    expect(console.error).toHaveBeenCalledWith('Unhandled error:', err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
