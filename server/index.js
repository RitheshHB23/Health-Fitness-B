import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Minimal Step schema
const Step = mongoose.model('Step', new mongoose.Schema({
  user: String,
  date: String,
  steps: Number
}));

// Save steps
app.post('/api/steps', async (req, res) => {
  const step = new Step(req.body);
  await step.save();
  res.json({ success: true });
});

// Get steps for user
app.get('/api/steps/:user', async (req, res) => {
  const steps = await Step.find({ user: req.params.user });
  res.json(steps);
});

app.get('/', (req, res) => res.send('API running'));

app.listen(process.env.PORT, () =>
  console.log('Server running on port', process.env.PORT)
);
