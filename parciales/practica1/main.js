import { Table } from './js/components/table.js';
import { restXHR, restFetch } from './js/services/rest.js';
import { Memorymanager } from './js/services/memory-manager.js';


var mm = new Memorymanager()
mm.readAndRender();