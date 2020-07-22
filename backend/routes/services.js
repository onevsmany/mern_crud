const router = require('express').Router();
let Service = require('../models/service.model');

router.route('/').get((req, res) => {
  Service.find()
    .then(services => res.json(services))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = Number(req.body.phonenumber);
  const email = req.body.email;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newService = new Service({
    username,
    firstname,
    lastname,
    phonenumber,
    email,
    description,
    duration,
    date,
  });

  newService.save()
  .then(() => res.json('Service added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Service.findById(req.params.id)
    .then(service => res.json(service))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Service.findByIdAndDelete(req.params.id)
    .then(() => res.json('Service deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Service.findById(req.params.id)
    .then(service => {
      service.username = req.body.username;
      service.firstname = req.body.firstname;
      service.lastname = req.body.lastname;
      service.phonenumber = Number(req.body.phonenumber);
      service.email = req.body.email;
      service.description = req.body.description;
      service.duration = Number(req.body.duration);
      service.date = Date.parse(req.body.date);

      service.save()
        .then(() => res.json('Service updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
