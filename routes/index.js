var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res)=> {
  res.render('form',{});
});

router.get('/get-country', async(req, res)=> {
  try {
    var country = nosql.model('Country')
    var data = await country.find({});
    res.send(data);
    } catch (error) {
    res.send(err)
  }
});

router.get('/get-state', async(req, res)=> {
 try {
  var country_id = req.query.country_id;
    var state = nosql.model('State');
    var data = await state.find({country_id:country_id},{});
    res.send(data);
  } catch (error) {
    res.send(err)
  }
});


router.get('/get-city', async(req, res)=> {
  try {
    var state_id = req.query.state_id;
    var city = nosql.model('city');
    var data = await city.find({state_id:state_id},{});
    res.send(data);
  } catch (error) {
    res.send(err)
  }
});


router.post('/get-data', async(req, res)=> {
  res.send(req.body);
});


module.exports = router;
