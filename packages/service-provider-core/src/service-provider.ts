import { MongoshInternalError } from '@mongosh/errors';
import Admin from './admin';
import Closable from './closable';
import makePrintableBson from './printable-bson';
import Readable from './readable';
import Writable from './writable';

/**
 * Interface for all service providers.
 */
export default interface ServiceProvider extends Readable, Writable, Closable, Admin {}

export class ServiceProviderCore {
  public bsonLibrary: any;
  constructor(bsonLibrary?: any) {
    if (bsonLibrary === undefined) {
      throw new MongoshInternalError('BSON Library is undefined.');
    }
    makePrintableBson(bsonLibrary);
    this.bsonLibrary = bsonLibrary;
  }
}
