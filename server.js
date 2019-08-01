import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Obdata from './models/Obdata';
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/obdatas', { useNewUrlParser: true });
//mongodb://gunjant:Indore1234@ds123664.mlab.com:23664/test_db
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
router.route('/obdatas/add').post((req, res) => {
	console.log('add requested');
    let obdata = new Obdata(req.body);
    obdata.save()
        .then(obdata => {
            res.status(200).json({'obdata': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
router.route('/obdatas').get((req, res) => {
    Obdata.find((err, obdatas) => {
        if (err)
            console.log(err);
        else
            res.json(obdatas);
    });
});
router.route('/obdatas/:id').get((req, res) => {
    Obdata.findById(req.params.id, (err, obdata) => {
        if (err)
            console.log(err);
        else
            res.json(obdata);
    })
});
router.route('/obdatas/update/:id').post((req, res) => {
    Obdata.findById(req.params.id, (err, obdata) => {
        if (!obdata)
            return next(new Error('Could not load Document'));
        else {
            obdata.selectedStoreIndex = req.body.selectedStoreIndex;
            obdata.selectedStoreName = req.body.selectedStoreName;
			obdata.storeName = req.body.storeName;
			obdata.storePass = req.body.storePass;
            obdata.productList = req.body.productList;
            obdata.productListExist = req.body.productListExist;
            obdata.searchedStore = req.body.searchedStore;
			
            obdata.save().then(obdata => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
router.route('/obdatas/delete/:id').get((req, res) => {
    Obdata.findByIdAndRemove({_id: req.params.id}, (err, obdata) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});
app.use(express.static('dist/ui-ng8/'), router);
app.listen(4000, () => console.log(`Express server running on port 4000`));