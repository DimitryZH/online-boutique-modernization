import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '30s', target: 30 },
    { duration: '10s', target: 0 },
  ],
};

const BASE_URL = 'http://127.0.0.1:8080';

export default function () {
  // Home page
  let res = http.get(`${BASE_URL}/`);
  check(res, { 'homepage OK': r => r.status === 200 });

  // View product page
  res = http.get(`${BASE_URL}/product/OLJCESPC7Z`);
  check(res, { 'product OK': r => r.status === 200 });

  // Add to cart (form post)
  res = http.post(
    `${BASE_URL}/cart`,
    { product_id: 'OLJCESPC7Z', quantity: '1' },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  check(res, { 'add to cart OK': r => r.status === 200 });

  // View cart
  res = http.get(`${BASE_URL}/cart`);
  check(res, { 'cart OK': r => r.status === 200 });

  sleep(1);
}

