import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Obdata = new Schema({
    productList: {
        type: String
    },
    productListExist: {
        type: String 
    },
    selectedStoreIndex: {
        type: Number
    },
    selectedStoreName: {
        type: String
    },
    storeName: {
        type: String
    },
    storePass: {
        type: String
    },
    searchedStore: {
        type: String
    }
});
export default mongoose.model('Obdata', Obdata);