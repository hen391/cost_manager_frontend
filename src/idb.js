// src/idb.js
/**
 * A wrapper class for managing IndexedDB operations such as adding, updating, and fetching records.
 */

// This class provides a wrapper for managing IndexedDB operations,
// such as adding, fetching, and updating records.
export default class IDBWrapper {
    /**
     * Creates an instance of IDBWrapper.
     * @param {string} dbName - The name of the IndexedDB database.
     * @param {number} version - The version of the IndexedDB schema.
     */
    constructor(dbName, version) {
      this.dbName = dbName;
      this.version = version;
      this.dbPromise = this.initDB();
    }

    /**
     * Initializes the IndexedDB instance and creates object stores if necessary.
     * @returns {Promise<IDBDatabase>} - The initialized database.
     */
    async initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          // Checks if there is no store named 'costs'; if not, creates it
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

    /**
     * Adds a new cost entry to the database.
     * @param {Object} cost - The cost entry to add.
     * @returns {Promise<number>} - The ID of the newly added cost.
     */
    async addCost(cost) {
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

    /**
     * Retrieves costs by month and year.
     * @param {number} month - The month (1-12).
     * @param {number} year - The year.
     * @returns {Promise<Array>} - A list of costs for the given month and year.
     */
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
                    if (
                        costDate.getMonth() + 1 === month && // Adjust for zero-based months
                        costDate.getFullYear() === year
                    ) {
                        costs.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(costs);
                }
            };
        });
    }


    /**
     * Clears all cost entries from the database.
     * @returns {Promise<void>} - Resolves when the data is cleared.
     */
    async clearData() {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        store.clear();
        return tx.complete;
    }

    /**
     * Updates an existing cost entry in the database.
     * @param {Object} cost - The cost entry with updated details.
     * @returns {Promise<void>} - Resolves when the update is complete.
     */
    async updateCost(cost) {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        store.put(cost);
        return tx.complete;
    }

    /**
     * Deletes a cost entry from the database.
     * @param {number|string} id - The ID of the cost entry to delete.
     * @returns {Promise<void>} - Resolves when the deletion is complete.
     */
    async deleteCost(id) {
        const db = await this.dbPromise;
        const tx = db.transaction('costs', 'readwrite');
        const store = tx.objectStore('costs');
        await store.delete(id);
        return tx.complete;
    }
}
  