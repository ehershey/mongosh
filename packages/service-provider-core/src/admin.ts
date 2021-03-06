import { ReplPlatform } from './platform';
import ShellAuthOptions from './shell-auth-options';
import type {
  MongoClientOptions,
  ReadConcern,
  ReadPreference,
  WriteConcern,
  Document,
  CreateCollectionOptions,
  ClientSession,
  DbOptions,
  ClientSessionOptions
} from './all-transport-types';


export default interface Admin {
  /**
   * What platform (Compass/CLI/Browser)
   */
  platform: ReplPlatform;

  /**
   * The initial database
   */
  initialDb: string;

  /**
   * The BSON package
   */
  bsonLibrary: any;

  /**
   * list databases.
   *
   * @param {String} database - The database name.
   *
   * @returns {Promise} The promise of command Documents.
   */
  listDatabases(database: string): Promise<Document>;

  /**
   * create a new service provider with a new connection.
   *
   * @param uri
   * @param options
   */
  getNewConnection(uri: string, options: MongoClientOptions): Promise<any>; // returns the ServiceProvider instance

  /**
   * Return connection info
   */
  getConnectionInfo(): Promise<Document>;

  /**
   * Authenticate
   */
  authenticate(authDoc: ShellAuthOptions): Promise<{ ok: number }>;

  /**
   * createCollection
   */
  createCollection(
    dbName: string,
    collName: string,
    options: CreateCollectionOptions,
    dbOptions?: DbOptions): Promise<{ ok: number }>;

  /**
   * Return read preference for connection.
   */
  getReadPreference(): ReadPreference;

  /**
   * Return read concern for connection.
   */
  getReadConcern(): ReadConcern | undefined;

  /**
   * Return write concern for connection.
   */
  getWriteConcern(): WriteConcern | undefined;

  /**
   * Reset the connection to have the option specified.
   *
   * @param options
   */
  resetConnectionOptions(options: Document): Promise<void>;

  /**
   * Start a session.
   * @param options
   */
  startSession(options: ClientSessionOptions): ClientSession;
}
