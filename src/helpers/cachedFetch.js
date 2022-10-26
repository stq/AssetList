var ls = require('local-storage');

export default function cachedFetch(url, requestOptions, staleCheckFn, keySuffix){

    const responseStorageKey = 'alcache_rs_'+url+keySuffix;
    const timestampStorageKey = 'alcache_ts_'+url+keySuffix;
    const cachedRs = ls.get(responseStorageKey);
    if( cachedRs ){
        console.log("Found cached response for request ", url);
        if( staleCheckFn(url, ls.get(timestampStorageKey)) ) {
            console.log("Cached response is stale, invalidating...");
            ls.remove(responseStorageKey);
            ls.remove(timestampStorageKey);
        } else {
            console.log("Cached response is OK, using...");
            return Promise.resolve(cachedRs)
        }
    }

    console.log("Requesting ", url);
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log("Received response ", JSON.stringify(response, null, 2))
            ls.set(responseStorageKey, response);
            ls.set(timestampStorageKey, Date.now());
            return response;
        })
}