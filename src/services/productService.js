import { put, takeLatest } from "redux-saga/effects";
import { GET_PRODUCTS } from "../components/actions/action-types/cart-actions";

function* productList() {
  let items = yield fetch("data.json").then(response => response.json());
  yield put({ type: GET_PRODUCTS, items });
}

export function* watchAgeUp() {
  yield takeLatest("GET_PRODUCTS_SERVICE", productList);
}
