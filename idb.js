/**
 * A wrapper library for managing IndexedDB operations.
 * This version is compatible with vanilla JavaScript for testing purposes.
 */

const idb = {
    /**
     * Opens or creates a costs database.
     * @param {string} dbName - The name of the IndexedDB database.
     * @param {number} version - The version of the IndexedDB schema.
     * @returns {Promise<Object>} - A Promise that resolves to the database wrapper object.
     */
    openCostsDB: async function(dbName, version) {
        const dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });

        const db = await dbPromise;

        return {
            /**
             * Adds a new cost entry to the database.
             * @param {Object} cost - The cost entry to add.
             * @returns {Promise<boolean>} - A Promise that resolves to true if the operation succeeded.
             */
            addCost: async function(cost) {
                return new Promise((resolve, reject) => {
                    const tx = db.transaction('costs', 'readwrite');
                    const store = tx.objectStore('costs');
                    const request = store.add(cost);

                    request.onsuccess = () => resolve(true);
                    request.onerror = () => reject(false);

                    tx.oncomplete = () => resolve(true);
                    tx.onerror = () => reject(false);
                });
            },

            /**
             * Gets all costs for a specific month and year.
             * @param {number} month - The month (1-12)
             * @param {number} year - The year
             * @returns {Promise<Array>} - A Promise that resolves to an array of costs
             */
            getCostsByMonthYear: async function(month, year) {
                return new Promise((resolve) => {
                    const tx = db.transaction('costs', 'readonly');
                    const store = tx.objectStore('costs');
                    const costs = [];

                    store.openCursor().onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor) {
                            const costDate = new Date(cursor.value.date);
                            if (costDate.getMonth() + 1 === month && 
                                costDate.getFullYear() === year) {
                                costs.push(cursor.value);
                            }
                            cursor.continue();
                        } else {
                            resolve(costs);
                        }
                    };
                });
            },

            /**
             * Updates an existing cost entry.
             * @param {Object} cost - The cost entry to update
             * @returns {Promise<boolean>} - A Promise that resolves to true if the operation succeeded
             */
            updateCost: async function(cost) {
                return new Promise((resolve, reject) => {
                    const tx = db.transaction('costs', 'readwrite');
                    const store = tx.objectStore('costs');
                    const request = store.put(cost);

                    request.onsuccess = () => resolve(true);
                    request.onerror = () => reject(false);
                });
            },

            /**
             * Clears all data from the costs store.
             * @returns {Promise<boolean>} - A Promise that resolves to true if the operation succeeded
             */
            clearData: async function() {
                return new Promise((resolve, reject) => {
                    const tx = db.transaction('costs', 'readwrite');
                    const store = tx.objectStore('costs');
                    const request = store.clear();

                    request.onsuccess = () => resolve(true);
                    request.onerror = () => reject(false);
                });
            }
        };
    }
};

// Make idb available globally for testing
if (typeof window !== 'undefined') {
    window.idb = idb;
} 