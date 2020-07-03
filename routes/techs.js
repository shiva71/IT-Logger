const express = require('express');

const router = express.Router();

//Express Validator
const { check, validationResult } = require('express-validator');

const fs = require('fs');
//@route GET api/techs
//@desc Get Techs
//@acess Public
router.get('/', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if (err) throw err;

    try {
      const data = JSON.parse(jsonString);
      const { techs } = data;

      res.send(techs);
    } catch (err) {
      res.send('Error parsing json', err);
    }
  });
});

//@route POST api/techs
//@desc Add Tech
//@acess Public
router.post(
  '/',
  [
    check('firstName', 'Please include a First Name').not().isEmpty(),
    check('lastName', 'Please Include a Last Name').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName } = req.body;
    fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
      if (err) throw err;

      try {
        const data = JSON.parse(jsonString);
        const { techs } = data;
        const length = data.techs.length;
        var id;

        if (length === 0) {
          id = 1;
        } else {
          const idT = techs.map((tech) => tech.id);
          id = idT[length - 1] + 1;
        }
        const newTech = {
          id,
          firstName,
          lastName,
        };

        data.techs = [...techs, newTech];

        fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
          if (err) throw err;
          res.send(newTech);
        });
      } catch (err) {
        res.status(err).send('Error');
      }
    });
  }
);

//@route  api/techs
//@desc   Delete a Tech
//@access Public

router.delete('/:id', async (req, res) => {
  const id = JSON.parse(req.params.id);

  fs.readFile('./db.json', 'utf-8', (err, jsonString) => {
    if (err) throw err;

    try {
      const data = JSON.parse(jsonString);
      const { techs } = data;

      data.techs = techs.filter((tech) => tech.id !== id);

      fs.writeFile('./db.json', JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        res.send('Tech Deleted');
      });
    } catch (err) {
      res.status(err).send('Error');
    }
  });
});
module.exports = router;
