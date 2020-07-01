const express = require('express');

const router = express.Router();

//Express Validator
const { check, validationResult } = require('express-validator');

const fs = require('fs');
//@route GET api/logs
//@desc Get Logs
//@acess Public
router.get('/', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if (err) throw err;

    try {
      const data = JSON.parse(jsonString);
      const { logs } = data;

      res.json(logs);
    } catch (err) {
      res.send('Error parsing json', err);
    }
  });
});

//@route POST api/logs
//@desc Get Logs
//@acess Public
router.post(
  '/',
  [
    check('message', 'Please include a log message').not().isEmpty(),
    check('tech', 'Please Include a Tech name').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { message, tech, attention } = req.body;
    fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
      if (err) throw err;

      try {
        const data = JSON.parse(jsonString);
        const { logs } = data;
        const id = data.logs.length + 1;
        const newLog = {
          id,
          message,
          tech,
          attention,
          date: new Date(),
        };

        data.logs = [...logs, newLog];

        fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
          if (err) throw err;
          res.send(newLog);
        });
      } catch (err) {
        res.status(err).send('Error');
      }
    });
  }
);

//@route PUT api/logs
//@desc  Update a log
//@access Public

router.put('/', async (req, res) => {
  const { id, message, tech, attention } = req.body;

  fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if (err) throw err;

    try {
      const data = JSON.parse(jsonString);
      const { logs } = data;

      const newLog = {
        id,
        message,
        tech,
        attention,
        date: new Date(),
      };

      data.logs = data.logs.map((log) => (log.id === id ? newLog : log));

      fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        res.send(newLog);
      });
    } catch (err) {
      res.status(err).send('Error');
    }
  });
});

//@route  api/logs
//@desc   Delete a log
//@access Public

router.delete('/:id', async (req, res) => {
  const id = JSON.parse(req.params.id);

  fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if (err) throw err;

    try {
      const data = JSON.parse(jsonString);
      const { logs } = data;

      data.logs = logs.filter((log) => log.id !== id);

      fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        res.send('Log Deleted');
      });
    } catch (err) {
      res.status(err).send('Error');
    }
  });
});
module.exports = router;
