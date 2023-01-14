import axios from 'axios';
import * as _ from 'lodash';
import sha from 'sha256';
import sessionService from './session.service';

const API_URL = process.env.REACT_APP_API_URL;

const HEADERS = (headers) => _.assign({
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}, headers);

const PAGE_SIZE = 100;

class ArchiveService {
  #OPERATOR = {
    purchase: {
      checker: 'purchases',
      paginationName: 'creditPurchases',
      type: 'purchase'
    },
    money: {
      checker: 'money',
      paginationName: 'moneyOperations',
      type: 'money'
    },
    wallet: {
      checker: 'wallet',
      paginationName: 'walletOperations',
      type: 'wallet'
    },
    practices: {
      checker: 'practices',
      paginationName: 'practicePayouts',
      type: 'practice'
    }
  }

  constructor() {
    this.#OPERATOR.purchase.urlMaker = this.#makeCreditPurchasesUrl;
    this.#OPERATOR.money.urlMaker = this.#makeMoneyOperationsUrl;
    this.#OPERATOR.wallet.urlMaker = this.#makeWalletOperationsUrl;
    this.#OPERATOR.practices.urlMaker = this.#makePracticePayoutsUrl;
  }

  #searchCache = {};

  #newFilter = (filter) => {
    const hash = sha(JSON.stringify(filter));
    this.#searchCache[hash] = {
      creditPurchases: {offset: 0},
      moneyOperations: {offset: 0},
      walletOperations: {offset: 0},
      practicePayouts: {offset: 0}
    };
    return hash;
  };

  #basicQuery = (filter, pagination) => `?from=${filter.from}&to=${filter.to}&limit=${PAGE_SIZE}&offset=${pagination.offset}`;
  #makeCreditPurchasesUrl = (filter, pagination) => {
    const url = `${API_URL}/credits${filter.customer ? '/' + filter.customer : ''}/purchase`;
    const query = this.#basicQuery(filter, pagination);
    return url + query;
  }

  #makeMoneyOperationsUrl = (filter, pagination) => {
    const url = `${API_URL}/money`;
    const query = this.#basicQuery(filter, pagination);
    return url + query;
  }

  #makeWalletOperationsUrl = (filter, pagination) => {
    const url = `${API_URL}/wallets${filter.customer ? '/' + filter.customer : ''}/operations`;
    const query = this.#basicQuery(filter, pagination);
    return url + query;
  }

  #makePracticePayoutsUrl = (filter, pagination) => {
    const url = `${API_URL}/practices/order/payment`;
    const customerQuery = filter.customer ? '&customer=' + filter.customer : '';
    const providerQuery = filter.provider ? '&provider=' + filter.provider : '';
    const query = this.#basicQuery(filter, pagination) + customerQuery + providerQuery;
    return url + query;
  }

  #search(url, pagination, accessToken, type) {
    return axios
        .get(
            url,
            { headers: HEADERS( {Authorization: `bearer ${accessToken}`}) }
        )
        .then(response => response.data)
        .then(data => {
          pagination.page = data.page;
          pagination.totalPages = data.totalPages;
          pagination.offset = data.offset;
          return _.map(data.docs, (item) => _.assign(item, {type: type}));
        })
        .catch(e => Promise.reject(e.response.data));
  }

  #consolidate(creditPurchases, moneyOperations, walletOperations, practicePayouts, cache) {
    const result = _.chain([])
        .concat(creditPurchases, moneyOperations, walletOperations, practicePayouts)
        .orderBy(['createdAt'], ['desc'])
        .take(PAGE_SIZE).value();
    cache.creditPurchases.backlog = _.difference(creditPurchases, result);
    cache.moneyOperations.backlog = _.difference(moneyOperations, result);
    cache.walletOperations.backlog = _.difference(walletOperations, result);
    cache.practicePayouts.backlog = _.difference(practicePayouts, result);
    return result;
  }

  async #next(filter, accessToken, hash, operation) {
    const pagination = this.#searchCache[hash][operation.paginationName];
    if (pagination.totalPages === pagination.page || pagination.backlog.length >= PAGE_SIZE) return Promise.resolve(pagination.backlog);
    pagination.offset = pagination.offset + PAGE_SIZE;
    const newItems = await this.#searchOrStub(filter, accessToken,hash, operation);
    return _.concat(pagination.backlog, newItems);
  }

  #searchOrStub(filter, accessToken, hash, operator) {
    const pagination = this.#searchCache[hash][operator.paginationName];
    if (filter[operator.checker])
      return this.#search(operator.urlMaker(filter, pagination), pagination, accessToken, operator.type);
    else return Promise.resolve({docs: [], page: 1, totalPages: 1, offset: 0})
        .then(data => {
          pagination.page = data.page;
          pagination.totalPages = data.totalPages;
          pagination.offset = data.offset;
          return data.docs;
        });
  }

  archive(filter) {
    const accessToken = sessionService.getToken();
    const hash = this.#newFilter(filter);
    const creditPurchasesPromise = this.#searchOrStub(filter, accessToken, hash, this.#OPERATOR.purchase);
    const moneyOperationsPromise = this.#searchOrStub(filter, accessToken, hash, this.#OPERATOR.money);
    const walletOperationsPromise = this.#searchOrStub(filter, accessToken, hash, this.#OPERATOR.wallet);
    const practicePayoutsPromise = this.#searchOrStub(filter, accessToken, hash, this.#OPERATOR.practices);
    return Promise.all([creditPurchasesPromise,moneyOperationsPromise, walletOperationsPromise, practicePayoutsPromise])
        .then(results => this.#consolidate(results[0], results[1], results[2], results[3], this.#searchCache[hash]));
  }

  next(filter) {
    const accessToken = sessionService.getToken();
    const hash = sha(JSON.stringify(filter));

    const creditPurchasesPromise = this.#next(filter, accessToken, hash,  this.#OPERATOR.purchase);
    const moneyOperationsPromise = this.#next(filter, accessToken, hash, this.#OPERATOR.money);
    const walletOperationsPromise = this.#next(filter, accessToken, hash, this.#OPERATOR.wallet);
    const practicePayoutsPromise = this.#next(filter, accessToken, hash,this.#OPERATOR.practices);

    return Promise.all([creditPurchasesPromise,moneyOperationsPromise, walletOperationsPromise, practicePayoutsPromise])
        .then(results => this.#consolidate(results[0], results[1], results[2], results[3], this.#searchCache[hash]));
  }
}

const service = new ArchiveService();
export default service;
