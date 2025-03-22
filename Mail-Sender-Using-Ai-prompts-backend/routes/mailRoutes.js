// // routes/mailRoutes.js
// import express from 'express';
// import { generateMailContent, sendMail } from '../controllers/mailController.js';

// const router = express.Router();

// router.post('/generate', generateMailContent);
// router.post('/send', sendMail);

// export default router;
import express from 'express';
import { sendMail } from '../controllers/mailController.js';

const router = express.Router();

router.post('/send', sendMail);

export default router;
