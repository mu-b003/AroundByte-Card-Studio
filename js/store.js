// Local designs in IndexedDB. Photos/logos are stored as data URLs on this device only.
const open=()=>new Promise((res,rej)=>{
  const r=indexedDB.open('abcs',1);
  r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('designs'))r.result.createObjectStore('designs',{keyPath:'id'})};
  r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);
});
const run=async(mode,fn)=>{
  const db=await open();
  return new Promise((res,rej)=>{
    const tx=db.transaction('designs',mode);let request;
    try{request=fn(tx.objectStore('designs'))}catch(err){db.close();rej(err);return}
    tx.oncomplete=()=>{const value=request&&request.result;db.close();res(value)};
    tx.onerror=()=>{const err=tx.error;db.close();rej(err)};
    tx.onabort=()=>{const err=tx.error;db.close();rej(err)};
  });
};
export const saveDesign=d=>run('readwrite',s=>s.put(d));
export const listDesigns=()=>run('readonly',s=>s.getAll()).then(r=>(r||[]).sort((a,b)=>b.updated-a.updated));
export const getDesign=id=>run('readonly',s=>s.get(id));
export const deleteDesign=id=>run('readwrite',s=>s.delete(id));
