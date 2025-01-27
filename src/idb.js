// src/idb.js
// This class provides a wrapper for managing IndexedDB operations,
// such as adding, fetching, and updating records.
export default class IDBWrapper {
    constructor(dbName, version) {
        // dbName specifies the name of the database.
        // version indicates the database schema version.
      this.dbName = dbName;
      this.version = version;
      this.dbPromise = this.initDB();
    }

    async initDB() {
        // Initializes the IndexedDB instance.
        // Creates object stores if they do not already exist.
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
        // Adds a new cost record to the IndexedDB.
        // Parameter 'cost' is an object containing the cost details.
      const db = await this.dbPromise;
      const tx = db.transaction('costs', 'readwrite');
      const store = tx.objectStore('costs');
      return store.add(cost);
    }
  
    async getCostsByMonth(month) {
      const db = await this.dbPromise;
      const tx = db.transaction('costs', 'readonly');
      const store = tx.objectStore('costs');
      const costs = [];
  
      return new Promise((resolve) => {
        store.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            const costDate = new Date(cursor.value.date);
            if (costDate.getMonth() + 1 === month) {
              costs.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(costs);
          }
        };
      });
    }

    async getCostsByMonthYear(month, year) {
        // Fetches all costs for a specific month and year from the database.
        // Parameters 'month' and 'year' specify the desired period.
      const db = await this.dbPromise;
      const tx = db.transaction('costs', 'readonly');
      const store = tx.objectStore('costs');
      const costs = [];
  
      return new Promise((resolve) => {
        store.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            const costDate = new Date(cursor.value.date);
            if (costDate.getFullYear() === year) {
              costs.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(costs);
          }
        };
      });
    }
  
    async clearData() {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        store.clear();
        return tx.complete;
    }

    async updateCost(cost) {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        store.put(cost);
        return tx.complete;
    }
  }
  