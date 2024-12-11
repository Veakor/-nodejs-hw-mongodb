import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);

    if (error) {
      next(createHttpError(400, error.message));
    }

    next();
  } catch (err) {
    next(err);
  }
};