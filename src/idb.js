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
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
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
                    if (costDate.getMonth() + 1 === month && costDate.getFullYear() === year) {
                        costs.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(costs);
                }
            };
        });
    }
}
