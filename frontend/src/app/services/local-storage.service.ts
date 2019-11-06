import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {AddrListObj} from './addrListObj';

// const STORAGE_KEY = 'addrListToBeMarked';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private addrListObj = new AddrListObj([]);
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(addresses: Array<string>, storageKey): void {
    const addrList: Array<string> = [];
    addresses.forEach(addr => {
      addrList.push(addr);
    });
    this.addrListObj.addrList = addrList;
    this.storage.set(storageKey, this.addrListObj);
    console.log(this.storage.get(storageKey) || 'Local storage is empty for the key addrListToBeMarked.');
  }

  // maybe I need a function to get the storage
}
