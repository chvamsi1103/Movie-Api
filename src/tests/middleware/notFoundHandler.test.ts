import { notFoundHandler } from '../../middleware/notFoundHandler';
import { Request } from 'express';

describe('notFoundHandler middleware', () => {
  it('should return 404 with message', () => {
    const req = {} as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    notFoundHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Route not found' });
  });
});
