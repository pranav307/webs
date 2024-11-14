import { configureStore } from '@reduxjs/toolkit';
import authReducer from './checkauth.js';
import  AdminProductsSlice from "./productauth.js"
import  shoppingProductSlice from "./shopproducts.js"
import shoppingCartSlice from "./cartproduct.js"
import addressSlice from "./addressauth.js"
import shoppingOrderSlice from "./orderslice.js";
import adminOrderSlice from "./adminorderslice.js"
import searchSlice from "./search.js"
import reviewSlice from "./reviewslice.js";
import commonFeatureSlice from "./featureimage.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts:  AdminProductsSlice,
    shoppingProducts:shoppingProductSlice,
    shoppingCart:shoppingCartSlice,
    address:addressSlice,
    shopOrder:shoppingOrderSlice,
    adminOrder:adminOrderSlice,
    searchresult:searchSlice,
    review:reviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
