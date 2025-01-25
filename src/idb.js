// src/idb.js

export default class IDBWrapper {
    constructor(dbName, version) {
      this.dbName = dbName;
      this.version = version;
      this.dbPromise = this.initDB();
    }
  
    async initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          // בודק אם לא קיימת חנות בשם 'costs'; אם לא קיימת, יוצרים אותה
          if (!db.objectStoreNames.contains('costs')) {
            db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
          }
        };
  
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    }
  
    async addCost(cost) {
      const db = await this.dbPromise;
      const tx = db.transaction('costs', 'readwrite');
      const store = tx.objectStore('costs');
      return store.add(cost);
    }
  
    async getCostsByMonthYear(month, year) {
      const db = await this.dbPromise;
      const tx = db.transaction('costs', 'readonly');
      const store = tx.objectStore('costs');
      const costs = [];
  
      return new Promise((resolve) => {
        store.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            const costDate = new Date(cursor.value.date);
            // בודקים שהחודש והשנה תואמים
            if (costDate.getMonth() + 1 === month && costDate.getFullYear() === year) {
              costs.push(cursor.value);
            }
            cursor.continue();
          } else {
            // לא נשארו רשומות
            resolve(costs);
          }
        };
      });
    }
  
    async addTestData() {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        const testData = [
            { category: 'Food', amount: 50, date: new Date().toISOString() },
            { category: 'Transport', amount: 20, date: new Date().toISOString() },
            { category: 'Utilities', amount: 100, date: new Date().toISOString() }
        ];
        testData.forEach(cost => store.add(cost));
        return tx.complete;
    }
  
    async clearData() {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        store.clear();
        return tx.complete;
    }
  }
  