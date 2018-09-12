import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cats = [
      { id: 11, name: 'Mr. Nice' , colour: 'black'},
      { id: 12, name: 'Narco',colour: 'white' },
      { id: 13, name: 'Bombasto',colour: 'blue' },
      { id: 14, name: 'Celeritas',colour: 'red' },
      { id: 15, name: 'Magneta',colour: 'white' },
      { id: 16, name: 'RubberMan',colour: 'green' },
      { id: 17, name: 'Dynama',colour: 'blue' },
      { id: 18, name: 'Dr IQ',colour: 'black' },
      { id: 19, name: 'Magma',colour: 'black' },
      { id: 20, name: 'Tornado',colour: 'red' }
    ];
    return {cats};
  }
}
