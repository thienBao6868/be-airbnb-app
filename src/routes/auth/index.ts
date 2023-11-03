import express from 'express';

const router = express();

/**
 * @login required email , password
 */
router.get('/sign-in', function (_req, res, _next) {
  res.send('welcome to sign-in');
});
router.post('/test', function (_req, res, _next) {
  res.send('welcome to test');
});

/**
 * @logout
 */
export default router;
