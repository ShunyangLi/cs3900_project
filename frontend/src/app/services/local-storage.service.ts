import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {AddrListObj} from './addrListObj';

const STORAGE_KEY = 'addrListToBeMarked';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private addrListObj = new AddrListObj([]);
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(addresses: Array<string>): void {
    const addrList: Array<string> = [];
    addresses.forEach(addr => {
      addrList.push(addr);
    });
    this.addrListObj.addrList = addrList;
    this.storage.set(STORAGE_KEY, this.addrListObj);
    console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty for the key addrListToBeMarked.');
  }
}
